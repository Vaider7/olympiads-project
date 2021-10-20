from datetime import datetime
from typing import Optional

from sqlalchemy import Column, DateTime, LargeBinary, String

from src.db.base_class import Base


class User(Base):
    username: str = Column(String, nullable=False, unique=True)
    password: bytes = Column(LargeBinary, nullable=False)
    firstname: str = Column(String, nullable=False)
    lastname: str = Column(String, nullable=False)
    deletedAt: Optional[datetime] = Column(DateTime(timezone=True), nullable=True)
