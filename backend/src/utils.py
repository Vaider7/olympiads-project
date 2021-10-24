from datetime import datetime, timezone
from typing import TypeVar

from fastapi import HTTPException
from pydantic import BaseModel
from starlette import status

from .db.base_class import Base
from .models import Olympiad

Model = TypeVar("Model", bound=Base)


def set_attrs(obj: Model, args: BaseModel) -> Model:
    update_data = args.dict()
    for field in update_data:
        setattr(obj, field, update_data[field])
    return obj


def get_utctime() -> datetime:
    return datetime.now(timezone.utc)


def check_olympiad_availability(olympiad: Olympiad) -> None:
    time_now = get_utctime()

    if not (time_now > olympiad.end):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Данная олимпиада завершилась",
        )

    if not (time_now < olympiad.end):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Данная ещё не началась",
        )
