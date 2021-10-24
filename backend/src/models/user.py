from datetime import datetime
from typing import TYPE_CHECKING, Optional

from sqlalchemy import Column, DateTime, LargeBinary, String
from sqlalchemy.orm import relationship

from src.db.base_class import Base

if TYPE_CHECKING:
    from .registered_user import RegisteredUser


class User(Base):
    username: str = Column(String, nullable=False, unique=True)
    password: bytes = Column(LargeBinary, nullable=False)
    firstname: str = Column(String, nullable=False)
    lastname: str = Column(String, nullable=False)
    deletedAt: Optional[datetime] = Column(DateTime(timezone=True), nullable=True)

    registered_olympiads: list["RegisteredUser"] = relationship("RegisteredUser", backref="user", lazy="noload")
