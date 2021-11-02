from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from ..models.registered_user import RegisteredUser
from ..schemas.registered_user import (RegisteredUserCreate,
                                       RegisteredUserUpdate)
from .base import CRUDBase


class CRUDRegisteredUser(CRUDBase[RegisteredUser, RegisteredUserCreate, RegisteredUserUpdate]):
    async def get_already_registered(
        self, db: AsyncSession, *, olympiad_id: int, user_id: int
    ) -> Optional[RegisteredUser]:
        result = await db.execute(
            select(self.model)
            .where(
                self.model.olympiad_id == olympiad_id,
                self.model.user_id == user_id,
            )
            .options(joinedload(self.model.olympiad))
        )

        olympiad = result.scalars().first()
        return olympiad

    async def get_registered_user(self, db: AsyncSession, *, user_id: int, olympiad_id: int) -> Optional[RegisteredUser]:
        result = await db.execute(
            select(self.model).where(self.model.user_id == user_id, self.model.olympiad_id == olympiad_id)
        )

        registered_user = result.scalars().first()
        return registered_user


registered_user = CRUDRegisteredUser(RegisteredUser)
