from fastapi import FastAPI

app = FastAPI(
    title="Unified HR + IT Access Platform",
    version="1.0.0",
    description="Enterprise access orchestration platform"
)


@app.get("/")
async def root():
    return {
        "message": "Unified HR Platform API",
        "status": "running"
    }