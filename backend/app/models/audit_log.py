from datetime import datetime
from uuid import UUID

from sqlalchemy import DateTime, Enum, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.base_model import (
    TimestampMixin,
    UUIDPrimaryKeyMixin,
)

from app.core.enums import AuditAction


class AuditLog(
    Base,
    UUIDPrimaryKeyMixin,
    TimestampMixin,
):

    __tablename__ = "audit_logs"

    employee_id: Mapped[UUID] = mapped_column(
        ForeignKey("employees.id"),
        nullable=False,
        index=True,
    )

    action: Mapped[AuditAction] = mapped_column(
        Enum(AuditAction),
        nullable=False,
    )

    provider: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    message: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    occurred_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    employee = relationship(
        "Employee",
        back_populates="audit_logs",
    )