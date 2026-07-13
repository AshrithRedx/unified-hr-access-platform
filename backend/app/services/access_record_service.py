from datetime import datetime
from uuid import UUID


from app.repositories.access_record_repository import AccessRecordRepository
from app.schemas.access_record import AccessRecordCreate
from app.schemas.provisioning import ProvisioningResult


class AccessRecordService:

    def __init__(
        self,
        repository: AccessRecordRepository,
    ):
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
    
    def revoke_access(
        self,
        record,
    ):
        return self.repository.revoke_access(record)