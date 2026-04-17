"""Project schemas."""
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


class ProjectBase(BaseModel):
    """Base project schema."""

    name: str
    description: str | None = None
    status: str = "planning"
    start_date: date | None = None
    due_date: date | None = None


class ProjectCreate(ProjectBase):
    """Schema for creating a project."""

    owner_id: int


class ProjectUpdate(BaseModel):
    """Schema for updating a project."""

    name: str | None = None
    description: str | None = None
    status: str | None = None
    owner_id: int | None = None
    start_date: date | None = None
    due_date: date | None = None
    completed_date: date | None = None


class ProjectResponse(ProjectBase):
    """Schema for project response."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    owner_id: int
    completed_date: date | None = None
    created_at: datetime
    updated_at: datetime
