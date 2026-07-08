import uuid

from sqlalchemy import Enum, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.enums import EmploymentStatus
from app.database.base import Base
from app.models.base_model import TimestampMixin, UUIDPrimaryKeyMixin


class Employee(Base, UUIDPrimaryKeyMixin, TimestampMixin):

    __tablename__ = "employees"

    frappe_employee_id: Mapped[str | None] = mapped_column(
        String(100),
        unique=True,
        nullable=True
    )

    first_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    last_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    department: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    designation: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    employment_status: Mapped[EmploymentStatus] = mapped_column(
        Enum(EmploymentStatus),
        default=EmploymentStatus.ACTIVE,
        nullable=False
    )

    role_template_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        nullable=True
    )

    def __repr__(self) -> str:
        return (
            f"<Employee(id={self.id}, "
            f"email='{self.email}', "
            f"status={self.employment_status.value})>"
        )