from app.repositories.dashboard_repository import DashboardRepository


class DashboardService:

    def __init__(
        self,
        repository: DashboardRepository,
    ):
        self.repository = repository

    def get_dashboard_summary(self):

        alerts = []

        for employee, access_record in self.repository.security_alerts():

            alerts.append(
                {
                    "employee_id": employee.id,
                    "employee_name": (
                        f"{employee.first_name} {employee.last_name}"
                    ),
                    "provider": access_record.provider,
                    "status": access_record.status,
                }
            )

        return {
            "total_employees":
                self.repository.total_employees(),

            "active_employees":
                self.repository.active_employees(),

            "offboarded_employees":
                self.repository.offboarded_employees(),

            "provisioned_accounts":
                self.repository.total_access_records(),

            "recent_activity":
                self.repository.recent_activity(),

            "security_alerts":
                alerts,
        }