from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Unified HR Platform"
    debug: bool = True

    database_url: str

    github_token: str
    github_owner: str
    github_repo: str

    class Config:
        env_file = ".env"


settings = Settings()