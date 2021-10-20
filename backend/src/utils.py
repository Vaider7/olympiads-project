from typing import TypeVar

from pydantic import BaseModel

from .db.base_class import Base

Model = TypeVar("Model", bound=Base)


def set_attrs(obj: Model, args: BaseModel) -> Model:
    for arg in args:
        setattr(obj, arg[0], arg[1])
    return obj
