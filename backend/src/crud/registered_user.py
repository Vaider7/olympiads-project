from typing import Optional

from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from ..models.registered_user import RegisteredUser
from ..schemas.registered_user import (RegisteredUserCreate,
                                       RegisteredUserUpdate)
from ..utils import get_utctime
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

    async def get_olympiads(self, db: AsyncSession, *, user_id: int) -> Optional[list[RegisteredUser]]:
        result = await db.execute(select(self.model).where(self.model.user_id == user_id))

        registered_olympiad = result.scalars().all()
        return registered_olympiad

    async def end_olympiad(self, db: AsyncSession, *, user_id: int, olympiad_id: int) -> None:
        result = await db.execute(
            select(self.model).where(self.model.user_id == user_id, self.model.olympiad_id == olympiad_id)
        )

        registered_user: RegisteredUser | None = result.scalars().first()
        if registered_user:
            registered_user.is_finished = True
            db.add(registered_user)
            await db.commit()
        return

    async def get_finished_olympiads(self, db: AsyncSession, *, user_id: int) -> list[RegisteredUser]:
        time = get_utctime()
        result = await db.execute(
            select(self.model).filter(
                or_(self.model.is_finished == True, time > self.model.end_time),
                self.model.user_id == user_id,
            )
        )

        finished_olympiads = result.scalars().all()
        return finished_olympiads


registered_user = CRUDRegisteredUser(RegisteredUser)
