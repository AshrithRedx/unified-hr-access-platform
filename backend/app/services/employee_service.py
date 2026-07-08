from app.models.employee import Employee
from app.repositories.employee_repository import EmployeeRepository
from app.schemas.employee import EmployeeCreate


class EmployeeService:

    def __init__(self, repository: EmployeeRepository):
        self.repository = repository

    def create_employee(
        self,
        employee_data: EmployeeCreate
    ) -> Employee:

        existing = self.repository.get_by_email(
            employee_data.email
        )

        if existing:
            raise ValueError(
                "Employee with this email already exists."
            )

        return self.repository.create(
            employee_data
        )