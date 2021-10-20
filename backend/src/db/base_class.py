from datetime import datetime

from sqlalchemy import Column, Integer
from sqlalchemy.ext.declarative import as_declarative
from sqlalchemy.orm import Mapped, declared_attr

from pydantic import PositiveInt


@as_declarative()
class Base(object):
    id: PositiveInt = Column(Integer, primary_key=True)
    __name__: str
    deletedAt: datetime

    @declared_attr
    def __tablename__(cls) -> Mapped[str]:
        if cls.__name__[-1] == "s":
            return f"{cls.__name__.lower()}es"
        return f"{cls.__name__.lower()}s"
