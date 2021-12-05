from datetime import datetime, timezone
from typing import Optional, TypeVar

from fastapi import HTTPException
from pydantic import BaseModel
from starlette import status

from .db.base_class import Base
from .models import Olympiad, RegisteredUser

Model = TypeVar("Model", bound=Base)


def set_attrs(obj: Model, args: BaseModel) -> Model:
    update_data = args.dict()
    for field in update_data:
        setattr(obj, field, update_data[field])
    return obj


def get_utctime() -> datetime:
    return datetime.now(timezone.utc)


def check_olympiad_availability(olympiad: Olympiad | None) -> None:
    time_now = get_utctime()

    if not olympiad:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Олимпиада не найдена")

    if time_now > olympiad.end:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Данная олимпиада завершилась",
        )

    if time_now < olympiad.start:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Данная олимпиада ещё не началась",
        )


def check_registered_user(registered_user: Optional[RegisteredUser]) -> None:
    time_now = get_utctime()

    if not registered_user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Сначала пройдите регистрацию")

    if not registered_user.start_time:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Сначала начните олимпиаду")

    if time_now > registered_user.end_time:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Ваше время вышло")
