from datetime import datetime
from uuid import UUID

from app.core.enums import AuditAction
from app.repositories.audit_log_repository import AuditLogRepository
from app.schemas.audit_log import AuditLogCreate


class AuditService:

    def __init__(
        self,
        repository: AuditLogRepository,
    ):
        self.repository = repository

    def log_event(
        self,
        employee_id: UUID,
        action: AuditAction,
        message: str,
        provider: str | None = None,
    ):

        audit = AuditLogCreate(
            employee_id=employee_id,
            action=action,
            provider=provider,
            message=message,
            occurred_at=datetime.utcnow(),
        )

        return self.repository.create(audit)

    def get_employee_history(
        self,
        employee_id: UUID,
    ):
        return self.repository.get_by_employee(employee_id)
    
    def get_all_history(
        self,
    ):

        logs = self.repository.get_all()

        return [

            {
                "id": log.id,

                "employee_name":
                    f"{log.employee.first_name} "
                    f"{log.employee.last_name}",

                "action": log.action,

                "provider": log.provider,

                "message": log.message,

                "occurred_at": log.occurred_at,

            }

            for log in logs

        ]