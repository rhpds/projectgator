"""Task model."""
from datetime import date, datetime

from sqlalchemy import Date, Float, ForeignKey, Integer, String, Table, Text, Column
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

# Many-to-many association table for tasks and tags
task_tags = Table(
    "task_tags",
    Base.metadata,
    Column("task_id", Integer, ForeignKey("tasks.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),
)


class Task(Base):
    """Task model."""

    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[str | None] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="todo")  # todo, in_progress, blocked, done
    priority: Mapped[str] = mapped_column(String(50), nullable=False, default="medium")  # low, medium, high, critical
    assignee_id: Mapped[int | None] = mapped_column(ForeignKey("users.id"), index=True)
    reporter_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    due_date: Mapped[date | None] = mapped_column(Date)
    estimated_hours: Mapped[float | None] = mapped_column(Float)
    actual_hours: Mapped[float | None] = mapped_column(Float)
    parent_task_id: Mapped[int | None] = mapped_column(ForeignKey("tasks.id"), index=True)
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    project: Mapped["Project"] = relationship(back_populates="tasks")  # type: ignore
    assignee: Mapped["User | None"] = relationship(back_populates="assigned_tasks", foreign_keys=[assignee_id])  # type: ignore
    reporter: Mapped["User"] = relationship(back_populates="reported_tasks", foreign_keys=[reporter_id])  # type: ignore
    parent_task: Mapped["Task | None"] = relationship(remote_side=[id], back_populates="subtasks")  # type: ignore
    subtasks: Mapped[list["Task"]] = relationship(back_populates="parent_task", cascade="all, delete-orphan")  # type: ignore
    comments: Mapped[list["Comment"]] = relationship(back_populates="task", cascade="all, delete-orphan")  # type: ignore
    tags: Mapped[list["Tag"]] = relationship(secondary=task_tags, back_populates="tasks")  # type: ignore

    def __repr__(self) -> str:
        return f"<Task {self.id}: {self.title}>"
