from datetime import datetime
from typing import TYPE_CHECKING, Any, Dict, Optional

from sqlalchemy import (ARRAY, JSON, Column, DateTime, ForeignKey, Integer,
                        String)
from sqlalchemy.orm import relationship

from src.db.base_class import Base

if TYPE_CHECKING:
    from .olympiad import Olympiad
    from .user_answer import UserAnswer


class Task(Base):
    name: Optional[str] = Column(String, nullable=True)
    description: str = Column(String, nullable=True)
    question: str = Column(String, nullable=False)
    answers: list[Dict[str, Any]] = Column(ARRAY(JSON), nullable=True)  # type: ignore
    typed_answers: list[str] = Column(ARRAY(String), nullable=True)  # type: ignore
    deletedAt: Optional[datetime] = Column(DateTime(timezone=True), nullable=True)
    task_type: str = Column(String, nullable=False)
    olympiad_id: int = Column(Integer, ForeignKey("olympiads.id"))
    points: int = Column(Integer, nullable=False, default=0)

    user_answer: "UserAnswer" = relationship("UserAnswer", backref="task")
    olympiad: "Olympiad"
