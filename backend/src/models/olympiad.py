from datetime import datetime
from typing import TYPE_CHECKING, Optional

from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship

from src.custom_types.non_negative_int import non_negative_int
from src.db.base_class import Base

if TYPE_CHECKING:
    from .registered_user import RegisteredUser
    from .task import Task


class Olympiad(Base):
    name: str = Column(String, nullable=False)
    discipline: str = Column(String, nullable=False)
    start: datetime = Column(DateTime(timezone=True), nullable=False)
    end: datetime = Column(DateTime(timezone=True), nullable=True)
    duration: int = Column(Integer, nullable=False)
    deletedAt: Optional[datetime] = Column(DateTime(timezone=True), nullable=True)
    tasks: list["Task"] = relationship("Task", backref="olympiad", lazy="noload")
    max_points: non_negative_int = Column(Integer, nullable=False)
    registered_users: list["RegisteredUser"] = relationship("RegisteredUser", backref="olympiad", lazy="noload")
