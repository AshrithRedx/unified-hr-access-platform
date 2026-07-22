from uuid import UUID

from app.adapters.adapter_manager import AdapterManager
from app.services.employee_service import EmployeeService
from app.services.access_record_service import AccessRecordService
from app.schemas.offboarding import OffboardingResponse
from app.core.enums import AuditAction

class OffboardingService:

    def __init__(
        self,
        employee_service: EmployeeService,
        access_record_service: AccessRecordService,
        audit_service,
    ):
        self.employee_service = employee_service
        self.access_record_service = access_record_service
        self.adapter_manager = AdapterManager()
        self.audit_service = audit_service
    
    def offboard_employee(
        self,
        employee_id: UUID,
    ) -> OffboardingResponse:
        employee = self.employee_service.get_employee(
            employee_id
        )
        access_records = (
        self.access_record_service
        .list_employee_access(employee_id)
        )

        revoked_providers = []

        for record in access_records:

            self.access_record_service.revoke_access(
                employee.id,
                record.provider.value,
            )

            self.access_record_service.revoke_access(
                employee.id,
                record.provider.value,
            )

            self.audit_service.log_event(
                employee_id=employee.id,
                action=AuditAction.ACCOUNT_REVOKED,
                provider=record.provider.value,
                message=f"{record.provider.value} access revoked",
            )

            revoked_providers.append(record.provider)
        
        employee = self.employee_service.offboard_employee(
            employee_id
        )

        self.audit_service.log_event(
            employee_id=employee.id,
            action=AuditAction.EMPLOYEE_OFFBOARDED,
            message=f"{employee.email} offboarded",
        )

        return OffboardingResponse(
        employee=employee,
        revoked_providers=revoked_providers,
    )