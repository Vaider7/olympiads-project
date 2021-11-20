from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.models.task import Task
from src.schemas.task import TaskCreate, TaskUpdate

from ..models import Olympiad
from .base import CRUDBase


class CRUDTask(CRUDBase[Task, TaskCreate, TaskUpdate]):
    async def get_task(self, db: AsyncSession, *, id: int) -> Optional[Task]:
        result = await db.execute(
            select(self.model)
            .where(self.model.id == id)
            .options(joinedload("olympiad"))
        )

        task = result.scalars().first()
        return task


task = CRUDTask(Task)
