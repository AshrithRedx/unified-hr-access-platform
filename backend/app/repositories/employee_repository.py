from uuid import UUID

from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate


class EmployeeRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(self, employee_data: EmployeeCreate) -> Employee:

        employee = Employee(
            **employee_data.model_dump()
        )

        self.db.add(employee)

        self.db.commit()

        self.db.refresh(employee)

        return employee
    
    def get_by_email(
        self,
        email: str
    ) -> Employee | None:

        return (
            self.db.query(Employee)
            .filter(Employee.email == email)
            .first()
        )
    
    def get_by_id(
        self,
        employee_id: UUID
    ) -> Employee | None:

        return (
            self.db.query(Employee)
            .filter(Employee.id == employee_id)
            .first()
        )
    
    def list_all(self) -> list[Employee]:

        return (
            self.db.query(Employee)
            .all()
        )