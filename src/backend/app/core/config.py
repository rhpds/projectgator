"""Application configuration."""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings."""

    model_config = SettingsConfigDict(
        env_prefix="PROJECTGATOR_",
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Database
    database_url: str = "postgresql://projectgator:projectgator@localhost:5432/projectgator"

    # Auth
    allowed_groups: list[str] = ["rhdp-projectgator-admins", "rhpds-admins"]
    allowed_users: list[str] = []

    # API
    api_v1_prefix: str = "/api/v1"
    cors_origins: list[str] = ["http://localhost:3001"]

    # App
    app_name: str = "Projectgator"
    debug: bool = False


settings = Settings()
