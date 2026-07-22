from datetime import datetime

from pydantic import BaseModel

from uuid import UUID

from app.core.enums import Provider, ProvisioningStatus


class DashboardActivityResponse(BaseModel):

    action: str

    provider: str | None

    message: str

    occurred_at: datetime

class SecurityAlertResponse(BaseModel):

    employee_id: UUID

    employee_name: str

    provider: Provider

    status: ProvisioningStatus

class DashboardSummaryResponse(BaseModel):

    total_employees: int

    active_employees: int

    offboarded_employees: int

    provisioned_accounts: int

    recent_activity: list[DashboardActivityResponse]

    security_alerts: list[SecurityAlertResponse]