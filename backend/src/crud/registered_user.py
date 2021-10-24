from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, load_only, lazyload

from ..custom_types.postitve_int import positive_int
from ..models import Olympiad
from ..models.registered_user import RegisteredUser
from ..schemas.registered_user import RegisteredUserCreate, RegisteredUserUpdate
from .base import CRUDBase


class CRUDRegisteredUser(
    CRUDBase[RegisteredUser, RegisteredUserCreate, RegisteredUserUpdate]
):
    async def get_already_registered(
        self, db: AsyncSession, *, olympiad_id: positive_int, user_id: positive_int
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


registered_user = CRUDRegisteredUser(RegisteredUser)
