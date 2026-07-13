from app.repositories.dashboard_repository import DashboardRepository


class DashboardService:

    def __init__(
        self,
        repository: DashboardRepository,
    ):
        self.repository = repository

    def get_dashboard_summary(self):

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
        }