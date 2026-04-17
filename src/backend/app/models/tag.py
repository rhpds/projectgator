"""Tag model."""
from datetime import datetime

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.task import task_tags


class Tag(Base):
    """Tag model."""

    __tablename__ = "tags"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    color: Mapped[str] = mapped_column(String(20), nullable=False, default="blue")  # PatternFly label colors
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    tasks: Mapped[list["Task"]] = relationship(secondary=task_tags, back_populates="tags")  # type: ignore

    def __repr__(self) -> str:
        return f"<Tag {self.name}>"
