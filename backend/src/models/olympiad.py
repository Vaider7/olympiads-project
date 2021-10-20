from datetime import datetime
from typing import Optional

from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship

from src.db.base_class import Base
from src.models.task import Task


class Olympiad(Base):
    name: str = Column(String, nullable=False)
    discipline: str = Column(String, nullable=False)
    start: datetime = Column(DateTime(timezone=True), nullable=False)
    end: datetime = Column(DateTime(timezone=True), nullable=True)
    duration: int = Column(Integer, nullable=False)
    deletedAt: Optional[datetime] = Column(DateTime(timezone=True), nullable=True)
    tasks: list[Task] = relationship("Task", backref="olympiad", lazy="select")
