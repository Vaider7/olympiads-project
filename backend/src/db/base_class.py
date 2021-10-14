from sqlalchemy import Column, Integer
from sqlalchemy.ext.declarative import as_declarative
from sqlalchemy.orm import Mapped, declared_attr


@as_declarative()
class Base(object):
    id = Column(Integer, primary_key=True)
    __name__: str

    @declared_attr
    def __tablename__(cls) -> Mapped[str]:
        return cls.__name__.lower()
