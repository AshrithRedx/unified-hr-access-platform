from fastapi import Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.repositories.access_record_repository import AccessRecordRepository
from app.services.access_record_service import AccessRecordService

from app.repositories.employee_repository import EmployeeRepository

from app.services.employee_service import EmployeeService
from app.services.provisioning_service import ProvisioningService
from app.services.onboarding_service import OnboardingService
from app.services.offboarding_service import OffboardingService

from app.repositories.audit_log_repository import AuditLogRepository
from app.services.audit_service import AuditService

from app.repositories.dashboard_repository import DashboardRepository
from app.services.dashboard_service import DashboardService

def get_employee_repository(
    db: Session = Depends(get_db),
):
    return EmployeeRepository(db)

def get_employee_service(
    repository: EmployeeRepository = Depends(get_employee_repository),
):
    return EmployeeService(repository)

def get_provisioning_service():
    return ProvisioningService()

def get_access_record_repository(
    db: Session = Depends(get_db),
):
    return AccessRecordRepository(db)



def get_audit_log_repository(
    db: Session = Depends(get_db),
):
    return AuditLogRepository(db)

def get_dashboard_repository(
    db: Session = Depends(get_db),
):

    return DashboardRepository(db)


def get_audit_service(
    repository: AuditLogRepository = Depends(
        get_audit_log_repository
    ),
):
    return AuditService(repository)

def get_access_record_service(
    repository: AccessRecordRepository = Depends(
        get_access_record_repository
    ),
    employee_service: EmployeeService = Depends(
        get_employee_service
    ),
    provisioning_service: ProvisioningService = Depends(
        get_provisioning_service
    ),
    audit_service: AuditService = Depends(
        get_audit_service
    ),
):

    return AccessRecordService(
        repository,
        employee_service,
        provisioning_service,
        audit_service,
    )

def get_onboarding_service(
    employee_service: EmployeeService = Depends(
        get_employee_service
    ),
    provisioning_service: ProvisioningService = Depends(
        get_provisioning_service
    ),
    access_record_service: AccessRecordService = Depends(
        get_access_record_service
    ),
    audit_service: AuditService = Depends(get_audit_service),
):

    return OnboardingService(
        employee_service,
        provisioning_service,
        access_record_service,
        audit_service,
    )

def get_offboarding_service(

    employee_service: EmployeeService = Depends(
        get_employee_service
    ),

    access_record_service: AccessRecordService = Depends(
        get_access_record_service
    ),

    audit_service: AuditService = Depends(get_audit_service),

):

    return OffboardingService(
        employee_service,
        access_record_service,
        audit_service,
    )


def get_dashboard_service(
    repository: DashboardRepository = Depends(
        get_dashboard_repository,
    ),
):

    return DashboardService(repository)