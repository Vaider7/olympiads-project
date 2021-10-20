from datetime import datetime
from typing import Optional

from sqlalchemy import Column, DateTime, Integer, String

from src.db.base_class import Base


class Olympiad(Base):
    name: str = Column(String, nullable=False)
    discipline: str = Column(String, nullable=False)
    start: datetime = Column(DateTime(timezone=True), nullable=False)
    end: datetime = Column(DateTime(timezone=True), nullable=False)
    duration: int = Column(Integer, nullable=False)
    deletedAt: Optional[datetime] = Column(DateTime(timezone=True), nullable=True)
