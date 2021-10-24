from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, FastAPI, HTTPException, Security, status
from sqlalchemy.ext.asyncio import AsyncSession

from src import crud
from src.deps import deps

from ..custom_types.postitve_int import positive_int
from ..deps.deps import get_current_user
from ..models import User, Olympiad
from ..schemas.registered_user import (
    RegisteredUserBase,
    RegisteredUserCreate,
    RegisteredUserUpdate,
)
from ..schemas.user_answer import UserAnswerCreate
from ..utils import get_utctime, check_olympiad_availability

router = APIRouter(tags=["Users and Olympiads interactions"])


@router.post("/api/users-olympiads/register")
async def register_user(
    *,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Security(get_current_user, scopes=["student"]),
    olympiad_data: RegisteredUserBase
) -> Any:
    olympiad = await crud.olympiad.get(db, id=olympiad_data.olympiad_id)

    if not olympiad:
        raise HTTPException(
            status_code=404,
            detail="Олимпиада не найдена",
        )

    is_registered = await crud.registered_user.get_already_registered(
        db, olympiad_id=olympiad_data.olympiad_id, user_id=current_user.id
    )

    if is_registered:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Вы уже зарегестрированы",
        )

    await crud.registered_user.create(
        db,
        obj_in=RegisteredUserCreate(
            olympiad_id=olympiad_data.olympiad_id, user_id=current_user.id
        ),
    )

    return


@router.patch("/api/users-olympiads/start")
async def start_olympiad(
    *,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Security(get_current_user, scopes=["student"]),
    olympiad_id: positive_int
) -> Any:
    time_now = get_utctime()

    registered_user = await crud.registered_user.get_already_registered(
        db, olympiad_id=olympiad_id, user_id=current_user.id
    )

    if not registered_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Вы не зарегестрированы на данную олимпиаду",
        )

    olympiad = registered_user.olympiad

    check_olympiad_availability(olympiad)

    if registered_user.start_time:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Вы уже начали данную олимпиаду",
        )

    await crud.registered_user.update(
        db,
        db_obj=registered_user,
        obj_in=RegisteredUserUpdate(
            start_time=time_now,
            end_time=time_now + timedelta(minutes=olympiad.duration),
            is_finished=False,
            olympiad_id=olympiad_id,
        ),
    )

    return


@router.post("/api/users-olympiads/give-answer")
async def give_answer(
    *,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Security(get_current_user, scopes=["student"]),
    answer_data: UserAnswerCreate
) -> Any:
    registered_user = await crud.registered_user.get(
        db, id=answer_data.registered_user_id, with_deleted=True
    )

    if not registered_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Регистрация на олимпиаду не найдена",
        )

    if registered_user.user_id is not current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Вы не можете вносить изменения в данную олимпиаду",
        )

    if registered_user.start_time is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Сначала пройдите регистрацию",
        )

    olympiad = await crud.olympiad.get(db, id=registered_user.olympiad_id)

    if not olympiad:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Олимпиада не найдена",
        )

    check_olympiad_availability(olympiad)

    if get_utctime() > registered_user.end_time:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ваше время вышло",
        )

    user_answer = user


def add_route(app: FastAPI) -> None:
    app.include_router(router)
