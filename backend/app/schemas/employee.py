from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr

from app.core.enums import EmploymentStatus


class EmployeeBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    department: str | None = None
    designation: str | None = None


class EmployeeCreate(EmployeeBase):
    frappe_employee_id: str | None = None
    role_template_id: UUID | None = None


class EmployeeUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    department: str | None = None
    designation: str | None = None
    role_template_id: UUID | None = None

class EmployeeResponse(EmployeeBase):

    model_config = ConfigDict(from_attributes=True)

    id: UUID
    frappe_employee_id: str | None
    role_template_id: UUID | None

    employment_status: EmploymentStatus

    created_at: datetime
    updated_at: datetime