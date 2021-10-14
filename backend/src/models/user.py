from sqlalchemy import Column, LargeBinary, String

from src.db.base_class import Base


class User(Base):
    username = Column(String, nullable=False, unique=True)
    password = Column(LargeBinary, nullable=False)
    firstname = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
