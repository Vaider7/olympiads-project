from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.models.olympiad import Olympiad
from src.schemas.olympiad import OlympiadCreate, OlympiadUpdate

from .base import CRUDBase


class CRUDOlympiad(CRUDBase[Olympiad, OlympiadCreate, OlympiadUpdate]):
    async def get(
        self, db: AsyncSession, *, id: int, with_deleted: bool = False
    ) -> Optional[Olympiad]:
        if not with_deleted:
            stmt = (
                select(self.model)
                .where(self.model.id == id, self.model.deletedAt == None)
                .options(joinedload(Olympiad.tasks))
            )
        else:
            stmt = (
                select(self.model)
                .where(self.model.id == id)
                .options(joinedload(Olympiad.tasks))
            )
        result = await db.execute(stmt)

        return result.scalar()


olympiad = CRUDOlympiad(Olympiad)
