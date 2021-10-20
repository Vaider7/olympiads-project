from typing import TypeVar

from pydantic import BaseModel

from .db.base_class import Base

Model = TypeVar("Model", bound=Base)


def set_attrs(obj: Model, args: BaseModel) -> Model:
    update_data = args.dict()
    for field in update_data:
        setattr(obj, field, update_data[field])
    return obj
