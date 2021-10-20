from typing import Any

from fastapi import APIRouter, Depends, FastAPI
from sqlalchemy.ext.asyncio import AsyncSession

from src import crud, schemas
from src.deps import deps
from src.schemas.task import TaskCreate

router = APIRouter(tags=["Tasks"])


@router.get("/api/tasks/get", response_model=list[schemas.Task])
async def get_tasks(db: AsyncSession = Depends(deps.get_db)) -> Any:
    tasks = await crud.task.get_multi(db)
    return tasks


@router.post("/api/tasks/create")
async def create_task(*, db: AsyncSession = Depends(deps.get_db), task_data: TaskCreate) -> Any:
    await crud.task.create(db, obj_in=task_data)
    return


def add_route(app: FastAPI) -> None:
    app.include_router(router)
