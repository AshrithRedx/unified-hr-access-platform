from uuid import UUID

from sqlalchemy.orm import Session
from datetime import datetime
from app.core.enums import ProvisioningStatus

from app.models.access_record import AccessRecord
from app.schemas.access_record import AccessRecordCreate


class AccessRecordRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        access_data: AccessRecordCreate,
    ) -> AccessRecord:

        record = AccessRecord(**access_data.model_dump())

        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)

        return record

    def get_by_employee(
        self,
        employee_id: UUID,
    ) -> list[AccessRecord]:

        return (
            self.db.query(AccessRecord)
            .filter(AccessRecord.employee_id == employee_id)
            .all()
        )
    # def get_by_id(
    #     self,
    #     employee_id,
    # ):
    #     return (
    #         self.db.query(Employee)
    #         .filter(Employee.id == employee_id)
    #         .first()
    #     )



    def get_by_provider(
        self,
        employee_id: UUID,
        provider,
    ) -> AccessRecord | None:

        return (
            self.db.query(AccessRecord)
            .filter(
                AccessRecord.employee_id == employee_id,
                AccessRecord.provider == provider,
            )
            .first()
        )
    
    def revoke_access(
        self,
        record: AccessRecord,
    ):

        record.status = ProvisioningStatus.REVOKED
        record.revoked_at = datetime.utcnow()

        self.db.commit()
        self.db.refresh(record)

        return record