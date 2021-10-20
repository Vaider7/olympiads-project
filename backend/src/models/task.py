from datetime import datetime
from typing import Optional

from pydantic import PositiveInt
from sqlalchemy import (ARRAY, JSON, Column, DateTime, ForeignKey, Integer,
                        String)

from src.db.base_class import Base


class Task(Base):
    name: Optional[str] = Column(String, nullable=True)
    description: str = Column(String, nullable=True)
    question: str = Column(String, nullable=False)
    answers = Column(ARRAY(JSON), nullable=False)
    deletedAt: Optional[datetime] = Column(DateTime(timezone=True), nullable=True)
    olympiad_id: PositiveInt = Column(Integer, ForeignKey("olympiads.id"))
