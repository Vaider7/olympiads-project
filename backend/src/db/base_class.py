from datetime import datetime

from sqlalchemy import Column, Integer
from sqlalchemy.ext.declarative import as_declarative
from sqlalchemy.orm import Mapped, declared_attr

from src.custom_types.postitve_int import positive_int


@as_declarative()
class Base(object):
    id: positive_int = Column(Integer, primary_key=True)
    __name__: str
    deletedAt: datetime

    @declared_attr
    def __tablename__(cls) -> Mapped[str]:
        for char in range(1, len(cls.__name__) - 1):
            if cls.__name__[char].isupper() and cls.__name__[char - 1].islower():
                cls.__name__ = cls.__name__[:char] + "_" + cls.__name__[char:]

        if cls.__name__[-1] == "s":
            return f"{cls.__name__.lower()}es"
        return f"{cls.__name__.lower()}s"
