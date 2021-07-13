from . import Base
from sqlalchemy import Column, Integer, String


class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True)
    name = Column(String, default='unnamed')
    description = Column(String, nullable=False)
    difficulty = Column(Integer, nullable=False)
