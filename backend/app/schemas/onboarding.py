from app.schemas.employee import EmployeeResponse
from app.schemas.provisioning import ProvisioningResult
from pydantic import BaseModel


class OnboardingResponse(BaseModel):
    employee: EmployeeResponse
    provisioning: list[ProvisioningResult]