from typing import Any

from fastapi import APIRouter, Body, Depends, FastAPI, HTTPException, Path, Security
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from src import crud, schemas
from src.deps import deps

from ..custom_types.postitve_int import positive_int
from ..deps.deps import get_current_user
from ..models import User
from ..schemas import RegisteredUser
from ..schemas.task import TaskCreate
from ..utils import check_olympiad_availability, check_registered_user

router = APIRouter(tags=["Olympiads"])


@router.post(
    "/api/olympiads/create",
    dependencies=[Security(get_current_user, scopes=["teacher"])],
)
async def create_olympiad(
    *,
    db: AsyncSession = Depends(deps.get_db),
    olympiad_data: schemas.OlympiadCreate,
) -> Any:
    """
    Create new olympiad
    - **name**: name of olympiad
    - **discipline**: discipline of olympiad
    - **start**: time of start of olympiad
    - **end**: time of end of olympiad
    - **duration**: duration for one attempt
    """

    if not olympiad_data.tasks:
        await crud.olympiad.create(db, obj_in=olympiad_data)
        return

    tasks = olympiad_data.tasks.copy()
    del olympiad_data.tasks

    max_points = sum([task.points for task in tasks])
    olympiad = await crud.olympiad.create_olympiad(
        db, obj_in=olympiad_data, max_points=max_points
    )

    for task in tasks:
        dict_task = task.dict()
        dict_task.update({"olympiad_id": olympiad.id})

        await crud.task.create(db, obj_in=TaskCreate(**dict_task))

    return


@router.delete(
    "/api/olympiads/delete",
    dependencies=[Security(get_current_user, scopes=["teacher"])],
)
async def delete_olympiad(
    *, db: AsyncSession = Depends(deps.get_db), olympiad_id: positive_int
) -> Any:
    """
    Remove olympiad
    - **olympiad_id**: id of olympiad
    """

    olympiad = await crud.olympiad.delete(db, id=olympiad_id)

    if not olympiad:
        raise HTTPException(
            status_code=404,
            detail="Олимпиада не найдена",
        )

    return


@router.put(
    "/api/olympiads/update",
    dependencies=[Security(get_current_user, scopes=["teacher"])],
)
async def update_olympiad(
    *, db: AsyncSession = Depends(deps.get_db), olympiad_data: schemas.OlympiadUpdate
) -> Any:
    """
    Create new olympiad
    - **id**: id of olympiad
    - **name**: name of olympiad
    - **discipline**: discipline of olympiad
    - **start**: time of start of olympiad
    - **end**: time of end of olympiad
    - **duration**: duration for one attempt
    """
    olympiad = await crud.olympiad.update(db, obj_in=olympiad_data)

    if not olympiad:
        raise HTTPException(
            status_code=404,
            detail="Олимпиада не найдена",
        )

    return


@router.get("/api/olympiads/get", response_model=list[schemas.Olympiad])
async def get_olympiads(*, db: AsyncSession = Depends(deps.get_db)) -> Any:
    olympiads = await crud.olympiad.get_multi(db)
    return olympiads


@router.post(
    "/api/olympiads/get-tasks-ids-names", response_model=list[tuple[positive_int, str]]
)
async def get_tasks_ids(
    *,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Security(get_current_user, scopes=["student"]),
    olympiad_id: positive_int = Body(...),
) -> Any:
    olympiad = await crud.olympiad.get_olympiad(db, id=olympiad_id)

    if not olympiad:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Олимпиада не найдена",
        )

    check_olympiad_availability(olympiad)

    registered_user = await crud.registered_user.get_already_registered(
        db, olympiad_id=olympiad_id, user_id=current_user.id
    )

    check_registered_user(registered_user)
    olympiad.tasks.sort(key=lambda x: x.id)
    tasks_ids_names = [tuple([task.id, task.name]) for task in olympiad.tasks]
    return tasks_ids_names


@router.get("/api/olympiads/get-finished", response_model=list[int])
async def get_finished_olympiads(
    *,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Security(get_current_user, scopes=["student"]),
) -> Any:
    finished_olympiads = await crud.registered_user.get_finished_olympiads(
        db, user_id=current_user.id
    )
    finished_ids = [elem.olympiad_id for elem in finished_olympiads]
    return finished_ids


@router.get("/api/olympiads/{olympiad_id}", response_model=schemas.OlympiadWithTasks)
async def get_olympiad(
    *,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Security(get_current_user, scopes=["student"]),
    olympiad_id: positive_int = Path(...),
) -> Any:
    olympiad = await crud.olympiad.get(db, id=olympiad_id)

    if not olympiad:
        raise HTTPException(
            status_code=404,
            detail="Олимпиада не найдена",
        )

    check_olympiad_availability(olympiad)

    registered_user = await crud.registered_user.get_already_registered(
        db, olympiad_id=olympiad_id, user_id=current_user.id
    )

    check_registered_user(registered_user)

    return olympiad


def add_route(app: FastAPI) -> None:
    app.include_router(router)
