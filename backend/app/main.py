from fastapi import FastAPI
from app.api.employee import router as employee_router

app = FastAPI(
    title="Unified HR + IT Access Platform",
    version="1.0.0",
    description="Enterprise access orchestration platform"
)

app.include_router(
    employee_router
)

@app.get("/")
async def root():
    return {
        "message": "Unified HR Platform API",
        "status": "running"
    }