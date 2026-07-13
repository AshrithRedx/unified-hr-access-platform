from datetime import datetime

from pydantic import BaseModel


class DashboardActivityResponse(BaseModel):

    action: str

    provider: str | None

    message: str

    occurred_at: datetime


class DashboardSummaryResponse(BaseModel):

    total_employees: int

    active_employees: int

    offboarded_employees: int

    provisioned_accounts: int

    recent_activity: list[DashboardActivityResponse]