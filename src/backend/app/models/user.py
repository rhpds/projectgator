"""User model."""
from datetime import datetime

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class User(Base):
    """User model."""

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(50), nullable=False, default="member")  # admin, member, viewer
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    owned_projects: Mapped[list["Project"]] = relationship(back_populates="owner", foreign_keys="Project.owner_id")  # type: ignore
    assigned_tasks: Mapped[list["Task"]] = relationship(back_populates="assignee", foreign_keys="Task.assignee_id")  # type: ignore
    reported_tasks: Mapped[list["Task"]] = relationship(back_populates="reporter", foreign_keys="Task.reporter_id")  # type: ignore
    comments: Mapped[list["Comment"]] = relationship(back_populates="user")  # type: ignore

    def __repr__(self) -> str:
        return f"<User {self.email}>"
