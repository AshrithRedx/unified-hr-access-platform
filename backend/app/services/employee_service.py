from app.models.employee import Employee
from app.repositories.employee_repository import EmployeeRepository
from app.schemas.employee import EmployeeCreate

from uuid import UUID

from app.core.enums import EmploymentStatus


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
    


    def get_employee(
            self,
            employee_id: UUID,
        ):

            employee = self.repository.get_by_id(employee_id)

            if employee is None:
                raise ValueError("Employee not found.")

            return employee
    
    def offboard_employee(
        self,
        employee_id: UUID,
    ):

        employee = self.repository.get_by_id(employee_id)

        if employee is None:
            raise ValueError("Employee not found.")

        employee.employment_status = EmploymentStatus.OFFBOARDED

        return self.repository.update(employee)
    
    def get_all_employees(self):

        return self.repository.get_all()
    
    def get_all_employees(self):

        return self.repository.get_all()