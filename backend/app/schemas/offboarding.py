from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.core.enums import Provider
from app.schemas.employee import EmployeeResponse


class OffboardingResponse(BaseModel):

    model_config = ConfigDict(from_attributes=True)

    employee: EmployeeResponse

    revoked_providers: list[Provider]