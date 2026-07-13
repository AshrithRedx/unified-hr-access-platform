from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.repositories.employee_repository import EmployeeRepository
from app.schemas.employee import EmployeeCreate, EmployeeResponse
from app.services.employee_service import EmployeeService
from app.core.dependencies import get_employee_service
from app.core.dependencies import get_access_record_service

from app.core.dependencies import get_onboarding_service
from app.services.onboarding_service import OnboardingService
from app.schemas.onboarding import OnboardingResponse
from app.schemas.audit_log import AuditLogResponse
from uuid import UUID

from app.services.employee_service import EmployeeService
from app.core.dependencies import get_employee_service

from app.core.dependencies import (
    get_employee_service,
    get_onboarding_service,
    get_offboarding_service,
    get_access_record_service,
    get_audit_service,
)


from app.schemas.access_record import AccessRecordResponse

from app.services.offboarding_service import OffboardingService
from app.services.access_record_service import AccessRecordService
from app.services.audit_service import AuditService
from app.schemas.offboarding import OffboardingResponse
from app.core.dependencies import get_audit_service
from app.schemas.audit_log import AuditLogResponse
from app.services.access_record_service import AccessRecordService
from app.core.dependencies import get_access_record_service
from app.schemas.access_record import AccessRecordResponse

from app.core.dependencies import (
    get_offboarding_service,
)

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


@router.post(
    "",
    response_model=EmployeeResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
):
    repository = EmployeeRepository(db)
    service = EmployeeService(repository)

    return service.create_employee(employee)

@router.post(
    "/onboard",
    response_model=OnboardingResponse,
)
def onboard_employee(
    employee: EmployeeCreate,
    service: OnboardingService = Depends(
        get_onboarding_service
    ),
):
    return service.onboard_employee(employee)

@router.post(
    "/{employee_id}/offboard",
    response_model=OffboardingResponse,
)

def offboard_employee(

    employee_id: UUID,

    service: OffboardingService = Depends(
        get_offboarding_service
    ),
):

    return service.offboard_employee(
        employee_id
    )

@router.get(
    "",
    response_model=list[EmployeeResponse],
)
def get_employees(
    service: EmployeeService = Depends(
        get_employee_service
    ),
):

    return service.get_all_employees()


@router.get(
    "",
    response_model=list[EmployeeResponse],
)
def get_employees(
    service: EmployeeService = Depends(
        get_employee_service
    ),
):

    return service.get_all_employees()



@router.get(
    "/{employee_id}",
    response_model=EmployeeResponse,
)
def get_employee(
    employee_id: UUID,
    service: EmployeeService = Depends(
        get_employee_service
    ),
):

    return service.get_employee(employee_id)

@router.get(
    "/{employee_id}/access",
    response_model=list[AccessRecordResponse],
)
def get_employee_access(
    employee_id: UUID,
    service: AccessRecordService = Depends(
        get_access_record_service,
    ),
):

    return service.list_employee_access(
        employee_id
    )

@router.get(
    "/{employee_id}/audit",
    response_model=list[AuditLogResponse],
)
def get_employee_audit(
    employee_id: UUID,
    service: AuditService = Depends(
        get_audit_service,
    ),
):

    return service.get_employee_history(
        employee_id
    )