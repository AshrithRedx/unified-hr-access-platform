from uuid import UUID

from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog
from app.schemas.audit_log import AuditLogCreate

from sqlalchemy.orm import joinedload


class AuditLogRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        audit: AuditLogCreate,
    ) -> AuditLog:

        log = AuditLog(**audit.model_dump())

        self.db.add(log)

        self.db.commit()

        self.db.refresh(log)

        return log

    def get_by_employee(
        self,
        employee_id: UUID,
    ) -> list[AuditLog]:

        return (
            self.db.query(AuditLog)
            .filter(
                AuditLog.employee_id == employee_id
            )
            .order_by(
                AuditLog.occurred_at.desc()
            )
            .all()
        )
    
    def get_all(
        self,
    ) -> list[AuditLog]:

        return (
            self.db.query(AuditLog)
            .options(
                joinedload(AuditLog.employee)
            )
            .order_by(
                AuditLog.occurred_at.desc()
            )
            .all()
        )