from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer

from src.custom_types.postitve_int import positive_int
from src.db.base_class import Base

if TYPE_CHECKING:
    from .olympiad import Olympiad


class RegisteredUser(Base):
    start_time: datetime = Column(DateTime(timezone=True), nullable=True)
    end_time: datetime = Column(DateTime(timezone=True), nullable=True)
    is_finished: bool = Column(Boolean, nullable=True)

    user_id: positive_int = Column(Integer, ForeignKey("users.id"), nullable=False)
    olympiad_id: positive_int = Column(Integer, ForeignKey("olympiads.id"), nullable=False)

    olympiad: "Olympiad"
