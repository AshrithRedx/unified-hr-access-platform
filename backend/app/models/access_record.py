from datetime import datetime
from uuid import UUID

from sqlalchemy import DateTime, Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.enums import Provider, ProvisioningStatus
from app.database.base import Base
from app.models.base_model import TimestampMixin, UUIDPrimaryKeyMixin

class AccessRecord(Base, UUIDPrimaryKeyMixin, TimestampMixin):

    __tablename__ = "access_records"

    employee_id: Mapped[UUID] = mapped_column(
        ForeignKey("employees.id"),
        nullable=False,
    )

    provider: Mapped[Provider] = mapped_column(
        Enum(Provider),
        nullable=False,
    )

    external_user_id: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    status: Mapped[ProvisioningStatus] = mapped_column(
        Enum(ProvisioningStatus),
        nullable=False,
    )

    provisioned_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    revoked_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    employee = relationship(
        "Employee",
        back_populates="access_records",
    )