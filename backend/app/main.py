from fastapi import FastAPI
from app.api.employee import router as employee_router
from app.api.dashboard import router as dashboard_router

from app.api.audit import router as audit_router

app = FastAPI(
    title="Unified HR + IT Access Platform",
    version="1.0.0",
    description="Enterprise access orchestration platform"
)

app.include_router(
    employee_router
)

app.include_router(
    dashboard_router
)

app.include_router(
    audit_router
)

@app.get("/")
async def root():
    return {
        "message": "Unified HR Platform API",
        "status": "running"
    }

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)