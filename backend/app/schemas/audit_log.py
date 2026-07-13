from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.core.enums import AuditAction


class AuditLogCreate(BaseModel):

    employee_id: UUID

    action: AuditAction

    provider: str | None = None

    message: str

    occurred_at: datetime


class AuditLogResponse(BaseModel):

    model_config = ConfigDict(from_attributes=True)

    id: UUID

    employee_id: UUID

    action: AuditAction

    provider: str | None

    message: str

    occurred_at: datetime

class GlobalAuditLogResponse(BaseModel):

    id: UUID

    employee_name: str

    action: AuditAction

    provider: str | None

    message: str

    occurred_at: datetime