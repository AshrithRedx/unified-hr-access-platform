from pydantic import BaseModel

from app.core.enums import Provider, ProvisioningStatus


class ProvisioningResult(BaseModel):

    provider: Provider

    status: ProvisioningStatus

    message: str

    external_user_id: str | None = None