from typing import Any

from fastapi import APIRouter, Depends, FastAPI, HTTPException, Path, Security
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from src import crud, schemas
from src.custom_types.postitve_int import positive_int
from src.deps import deps
from src.deps.deps import get_current_user
from src.models import User
from src.schemas.task import Task, TaskCreate, TaskUpdate
from src.utils import check_olympiad_availability, check_registered_user

router = APIRouter(tags=["Tasks"])


@router.get("/api/tasks/get", response_model=list[schemas.Task])
async def get_tasks(db: AsyncSession = Depends(deps.get_db)) -> Any:
    tasks = await crud.task.get_multi(db)
    return tasks


@router.post("/api/tasks/create", dependencies=[Security(get_current_user, scopes=["teacher"])])
async def create_task(*, db: AsyncSession = Depends(deps.get_db), task_data: TaskCreate) -> Any:
    await crud.task.create(db, obj_in=task_data)
    return


@router.put("/api/tasks/update", dependencies=[Security(get_current_user, scopes=["teacher"])])
async def update_task(*, db: AsyncSession = Depends(deps.get_db), task_data: TaskUpdate) -> Any:
    await crud.task.update(db, obj_in=task_data)
    return


@router.delete("/api/tasks/delete", dependencies=[Security(get_current_user, scopes=["teacher"])])
async def delete_task(*, db: AsyncSession = Depends(deps.get_db), task_id: positive_int) -> Any:
    task = await crud.task.delete(db, id=task_id)

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Задача не найдена",
        )

    return


@router.get("/api/tasks/{task_id}", response_model=Task)
async def get_task(
    *,
    db: AsyncSession = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    task_id: positive_int = Path(...)
) -> Any:
    task = await crud.task.get_task(db, id=task_id)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Задача не найдена",
        )

    check_olympiad_availability(task.olympiad)

    registered_user = await crud.registered_user.get_already_registered(
        db, olympiad_id=task.olympiad.id, user_id=current_user.id
    )

    check_registered_user(registered_user)

    return task


def add_route(app: FastAPI) -> None:
    app.include_router(router)
