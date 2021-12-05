from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Body, Depends, FastAPI, HTTPException, Security, status
from sqlalchemy.ext.asyncio import AsyncSession

from src import crud, schemas
from src.deps import deps

from ..custom_types.postitve_int import positive_int
from ..deps.deps import get_current_user
from ..enums.task_type import task_type
from ..models import User
from ..schemas.registered_user import (
    RegisteredUserBase,
    RegisteredUserCreate,
    RegisteredUserUpdate,
)
from ..schemas.result import ResultBase
from ..schemas.user_answer import UserAnswerCreate
from ..utils import check_olympiad_availability, get_utctime

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
    time_now = get_utctime()

    registered_user = await crud.registered_user.get_registered_user(
        db,
        user_id=current_user.id,
        olympiad_id=answer_data.olympiad_id,
    )

    if not registered_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Регистрация на олимпиаду не найдена",
        )

    if registered_user.start_time is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Сначала начните олимпиаду",
        )

    if time_now > registered_user.end_time:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Ваше время вышло",
        )

    olympiad = await crud.olympiad.get(db, id=registered_user.olympiad_id)

    if not olympiad:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Олимпиада не найдена",
        )

    check_olympiad_availability(olympiad)

    task = await crud.task.get(db, id=answer_data.task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Задача не найдена",
        )

    if task.olympiad_id != olympiad.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Задача не относится к данной олимпиаде",
        )

    if (
        (task.task_type == task_type.ONE.value)
        or (task.task_type == task_type.TYPED.value)
    ) and len(answer_data.answer) > 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Разрешён только один ответ",
        )

    if (task.task_type == task_type.ONE.value) or (
        task.task_type == task_type.MULTI.value
    ):
        try:
            for i in answer_data.answer:
                int(i)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
            )
        answer_data.answer = list(set(answer_data.answer))

    user_answer = await crud.user_answer.get_user_answer(
        db,
        task_id=answer_data.task_id,
        olympiad_id=olympiad.id,
        user_id=current_user.id,
    )

    if not user_answer:
        await crud.user_answer.create_user_answer(
            db, obj_in=answer_data, user_id=current_user.id
        )
        return

    await crud.user_answer.create_user_answer(
        db, db_obj=user_answer, obj_in=answer_data, user_id=current_user.id
    )
    return


@router.post(
    "/api/users-olympiads/get-given-answer", response_model=schemas.UserAnswerInDB
)
async def get_given_answer(
    *,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Security(deps.get_current_user, scopes=["student"]),
    task_id: positive_int = Body(...),
    olympiad_id: positive_int = Body(...)
) -> Any:
    user_answer = await crud.user_answer.get_user_answer(
        db, task_id=task_id, olympiad_id=olympiad_id, user_id=current_user.id
    )
    return user_answer


@router.put("/api/users-olympiads/end-olympiad")
async def end_olympiad(
    *,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Security(deps.get_current_user, scopes=["student"]),
    olympiad_id: positive_int = Body(...)
) -> Any:
    await crud.registered_user.end_olympiad(
        db, user_id=current_user.id, olympiad_id=olympiad_id
    )


@router.get(
    "/api/users-olympiads/get-result/{olympiad_id}", response_model=list[ResultBase]
)
async def get_result(
    *,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Security(deps.get_current_user, scopes=["student"]),
    olympiad_id: positive_int
) -> Any:
    user_answers = await crud.user_answer.get_results(
        db, olympiad_id=olympiad_id, user_id=current_user.id
    )
    processed_objs = []

    for user_answer in user_answers:

        user_points: float = 0
        right_answers = None
        task = user_answer.task
        if task.task_type == task_type.TYPED.value:
            if user_answer.answer[0] in task.typed_answers:
                user_points = task.points

        else:
            right_answers = [
                str(answer["no"]) for answer in task.answers if answer["verity"] is True
            ]
            if task.task_type == task_type.ONE.value:
                if user_answer.answer[0] in right_answers:
                    user_points = task.points
            else:
                right_answer_value: float = task.points / len(right_answers)
                right_answers_count = 0
                for answer in user_answer.answer:
                    if answer in right_answers:
                        right_answers_count += 1

                user_points = right_answers_count * right_answer_value

                if len(user_answer.answer) > len(right_answers):
                    wrong_answers = len(user_answer.answer) - len(right_answers)
                    penalty_points = wrong_answers * right_answer_value
                    user_points -= penalty_points
        processed_objs.append(
            {
                "task_id": task.id,
                "task_points": task.points,
                "task_answers": task.answers,
                "right_answers": right_answers,
                "user_answer": user_answer.answer,
                "user_points": user_points,
                "task_type": task.task_type,
            }
        )
    return processed_objs


def add_route(app: FastAPI) -> None:
    app.include_router(router)
