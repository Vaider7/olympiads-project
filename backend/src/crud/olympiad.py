from typing import Optional

from sqlalchemy import desc, null, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.schemas.olympiad import OlympiadCreate, OlympiadUpdate

from ..models import Olympiad
from ..utils import set_attrs
from .base import CRUDBase

Null = null()


class CRUDOlympiad(CRUDBase[Olympiad, OlympiadCreate, OlympiadUpdate]):
    async def get_olympiad(self, db: AsyncSession, *, id: int, with_deleted: bool = False) -> Optional[Olympiad]:
        if not with_deleted:
            stmt = (
                select(self.model)
                .where(
                    self.model.id == id,
                    self.model.deletedAt == Null,
                )
                .options(joinedload("tasks"))
            )
        else:
            stmt = select(self.model).where(self.model.id == id).options(joinedload("tasks"))
        result = await db.execute(stmt)

        return result.scalars().first()

    async def create_olympiad(self, db: AsyncSession, *, obj_in: OlympiadCreate, max_points: int = 0) -> Olympiad:
        db_obj: Olympiad = self.model()
        set_attrs(db_obj, obj_in)
        db_obj.max_points = max_points
        db.add(db_obj)
        await db.commit()
        return db_obj

    async def get_multi(
        self,
        db: AsyncSession,
        *,
        offset: int = 0,
        limit: int = 100,
        with_deleted: bool = False,
    ) -> list[Optional[Olympiad]]:
        if not with_deleted:
            stmt = (
                select(self.model)
                .where(self.model.deletedAt == Null)
                .offset(offset)
                .limit(limit)
                .order_by(desc(self.model.id))
            )
        else:
            stmt = select(self.model).offset(offset).limit(limit).order_by(desc(self.model.id))
        result = await db.execute(stmt)

        return result.scalars().all()


olympiad = CRUDOlympiad(Olympiad)
