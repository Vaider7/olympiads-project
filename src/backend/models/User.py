from . import Base
from sqlalchemy import Column, Integer, String, LargeBinary


class User(Base):
    __tablename__ = 'users'

    id: int = Column(Integer, primary_key=True)
    username: str = Column(String, nullable=False)
    password: bytes = Column(LargeBinary, nullable=False)
    firstname: str = Column(String, nullable=False)
    lastname: str = Column(String, nullable=False)
