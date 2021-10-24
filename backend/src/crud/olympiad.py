from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.schemas.olympiad import OlympiadCreate, OlympiadUpdate

from ..models import Olympiad
from ..utils import set_attrs
from .base import CRUDBase


class CRUDOlympiad(CRUDBase[Olympiad, OlympiadCreate, OlympiadUpdate]):
    async def get(self, db: AsyncSession, *, id: int, with_deleted: bool = False) -> Optional[Olympiad]:
        if not with_deleted:
            stmt = (
                select(self.model)
                .where(self.model.id == id, self.model.deletedAt == None)
                .options(joinedload(self.model.tasks))
            )
        else:
            stmt = select(self.model).where(self.model.id == id).options(joinedload(Olympiad.tasks))
        result = await db.execute(stmt)

        return result.scalar()

    async def create_olympiad(self, db: AsyncSession, *, obj_in: OlympiadCreate, max_points: int = 0) -> Olympiad:
        db_obj: Olympiad = self.model()
        set_attrs(db_obj, obj_in)
        db_obj.max_points = max_points
        db.add(db_obj)
        await db.commit()
        return db_obj


olympiad = CRUDOlympiad(Olympiad)
