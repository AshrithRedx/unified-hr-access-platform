from datetime import datetime
from uuid import UUID


from app.repositories.access_record_repository import AccessRecordRepository
from app.schemas.access_record import AccessRecordCreate
from app.schemas.provisioning import ProvisioningResult
from app.core.enums import AuditAction


class AccessRecordService:

    def __init__(
        self,
        repository: AccessRecordRepository,
        employee_service,
        provisioning_service,
        audit_service,
    ):
        self.repository = repository
        self.employee_service = employee_service
        self.provisioning_service = provisioning_service
        self.audit_service = audit_service
        self.repository = repository

    def record_access(
        self,
        employee_id: UUID,
        provisioning_result: ProvisioningResult,
    ):

        access_record = AccessRecordCreate(
            employee_id=employee_id,
            provider=provisioning_result.provider,
            external_user_id=provisioning_result.external_user_id,
            status=provisioning_result.status,
            provisioned_at=datetime.utcnow(),
        )

        return self.repository.create(access_record)

    def list_employee_access(
        self,
        employee_id: UUID,
    ):
        return self.repository.get_by_employee(employee_id)
    
    def provision_access(
        self,
        employee_id: UUID,
        provider: str,
    ):

        employee = self.employee_service.get_employee(
            employee_id
        )

        result = self.provisioning_service.provision_provider(
            employee,
            provider,
        )

        existing = self.repository.get_by_provider(
            employee_id,
            result.provider,
        )

        if existing:

            access_record = self.repository.activate_access(
                existing,
                result.external_user_id,
            )

        else:

            access_record = self.record_access(
                employee_id,
                result,
            )

        self.audit_service.log_event(
            employee_id=employee_id,
            action=AuditAction.ACCOUNT_PROVISIONED,
            provider=result.provider.value,
            message=f"{result.provider.value} account provisioned",
        )

        return access_record
    
    def revoke_access(
        self,
        employee_id: UUID,
        provider: str,
    ):

        employee = self.employee_service.get_employee(
            employee_id
        )

        result = self.provisioning_service.revoke_provider(
            employee,
            provider,
        )

        record = self.repository.get_by_provider(
            employee_id,
            result.provider,
        )

        if record is None:
            raise ValueError(
                f"No {provider} access found for employee."
            )

        access_record = self.repository.revoke_access(
            record,
        )

        self.audit_service.log_event(
            employee_id=employee_id,
            action=AuditAction.ACCOUNT_REVOKED,
            provider=result.provider.value,
            message=f"{result.provider.value} account revoked",
        )

        return access_record