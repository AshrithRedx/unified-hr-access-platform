from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.core.enums import Provider, ProvisioningStatus


class AccessRecordCreate(BaseModel):
    employee_id: UUID
    provider: Provider
    external_user_id: str
    status: ProvisioningStatus
    provisioned_at: datetime


class AccessRecordResponse(BaseModel):

    model_config = ConfigDict(from_attributes=True)

    id: UUID
    employee_id: UUID
    provider: Provider
    external_user_id: str
    status: ProvisioningStatus
    provisioned_at: datetime
    revoked_at: datetime | None

