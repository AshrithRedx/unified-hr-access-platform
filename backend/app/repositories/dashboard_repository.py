from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.models.access_record import AccessRecord
from app.models.audit_log import AuditLog

from app.core.enums import EmploymentStatus
from app.core.enums import ProvisioningStatus


class DashboardRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def total_employees(self):

        return self.db.query(Employee).count()

    def active_employees(self):

        return (
            self.db.query(Employee)
            .filter(
                Employee.employment_status ==
                EmploymentStatus.ACTIVE
            )
            .count()
        )

    def offboarded_employees(self):

        return (
            self.db.query(Employee)
            .filter(
                Employee.employment_status ==
                EmploymentStatus.OFFBOARDED
            )
            .count()
        )

    def total_access_records(self):

        return self.db.query(AccessRecord).count()

    def recent_activity(
        self,
        limit: int = 5,
    ):

        return (
            self.db.query(AuditLog)
            .order_by(
                AuditLog.occurred_at.desc()
            )
            .limit(limit)
            .all()
        )
    
    def security_alerts(self):

        return (
            self.db.query(Employee, AccessRecord)
            .join(
                AccessRecord,
                Employee.id == AccessRecord.employee_id,
            )
            .filter(
                Employee.employment_status == EmploymentStatus.OFFBOARDED,
                AccessRecord.status != ProvisioningStatus.REVOKED,
            )
            .all()
        )