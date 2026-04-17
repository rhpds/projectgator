"""Task schemas."""
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


class TaskBase(BaseModel):
    """Base task schema."""

    title: str
    description: str | None = None
    status: str = "todo"
    priority: str = "medium"
    due_date: date | None = None
    estimated_hours: float | None = None
    actual_hours: float | None = None


class TaskCreate(TaskBase):
    """Schema for creating a task."""

    project_id: int
    assignee_id: int | None = None
    reporter_id: int
    parent_task_id: int | None = None


class TaskUpdate(BaseModel):
    """Schema for updating a task."""

    title: str | None = None
    description: str | None = None
    status: str | None = None
    priority: str | None = None
    assignee_id: int | None = None
    due_date: date | None = None
    estimated_hours: float | None = None
    actual_hours: float | None = None
    parent_task_id: int | None = None


class TaskResponse(TaskBase):
    """Schema for task response."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    project_id: int
    assignee_id: int | None
    reporter_id: int
    parent_task_id: int | None
    created_at: datetime
    updated_at: datetime
