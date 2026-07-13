from fastapi import APIRouter, Depends

from app.core.dependencies import get_audit_service
from app.schemas.audit_log import (
    GlobalAuditLogResponse,
)
from app.services.audit_service import AuditService

router = APIRouter(
    prefix="/audit",
    tags=["Audit"],
)


@router.get(
    "",
    response_model=list[GlobalAuditLogResponse],
)
def get_all_audit_logs(
    service: AuditService = Depends(
        get_audit_service,
    ),
):

    return service.get_all_history()