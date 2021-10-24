from datetime import datetime
from typing import Optional

from sqlalchemy import (ARRAY, JSON, Column, DateTime, ForeignKey, Integer,
                        String)

from src.custom_types.non_negative_int import non_negative_int
from src.custom_types.postitve_int import positive_int
from src.db.base_class import Base


class Task(Base):
    name: Optional[str] = Column(String, nullable=True)
    description: str = Column(String, nullable=True)
    question: str = Column(String, nullable=False)
    answers = Column(ARRAY(JSON), nullable=False)
    deletedAt: Optional[datetime] = Column(DateTime(timezone=True), nullable=True)
    task_type: str = Column(String, nullable=False)
    olympiad_id: positive_int = Column(Integer, ForeignKey("olympiads.id"))
    points: non_negative_int = Column(Integer, nullable=False, default=0)
