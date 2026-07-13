from app.services.employee_service import EmployeeService
from app.services.provisioning_service import ProvisioningService
from app.services.access_record_service import AccessRecordService
from app.core.enums import AuditAction
from app.schemas.employee import EmployeeCreate
from app.schemas.onboarding import OnboardingResponse


class OnboardingService:

    def __init__(
        self,
        employee_service: EmployeeService,
        provisioning_service: ProvisioningService,
        access_record_service: AccessRecordService,
        audit_service,
    ):
        self.employee_service = employee_service
        self.provisioning_service = provisioning_service
        self.access_record_service = access_record_service
        self.audit_service = audit_service

    def onboard_employee(
        self,
        employee_data: EmployeeCreate,
    ) -> OnboardingResponse:

        employee = self.employee_service.create_employee(employee_data)

        self.audit_service.log_event(
            employee_id=employee.id,
            action=AuditAction.EMPLOYEE_CREATED,
            message=f"Employee {employee.email} created",
        )

        provisioning_results = (
            self.provisioning_service
            .provision_employee(employee)
        )

        # Persist every successful provisioning
        for result in provisioning_results:
            self.access_record_service.record_access(
                employee.id,
                result,
            )

            self.audit_service.log_event(
                employee_id=employee.id,
                action=AuditAction.ACCOUNT_PROVISIONED,
                provider=result.provider.value,
                message=f"{result.provider.value} account provisioned",
            )

        return OnboardingResponse(
            employee=employee,
            provisioning=provisioning_results,
        )