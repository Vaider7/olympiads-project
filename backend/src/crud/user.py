from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.security import get_password_hash, verify_password
from src.models.user import User
from src.schemas.user import UserCreate, UserUpdate

from ..utils import set_attrs
from .base import CRUDBase


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    async def get_by_username(self, db: AsyncSession, username: str) -> Optional[User]:
        stmt = select(User).where(User.username == username)
        result = await db.execute(stmt)
        user = result.scalar()
        return user

    async def authenticate(self, db: AsyncSession, *, username: str, password: str) -> Optional[User]:
        user = await self.get_by_username(db, username=username)
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user

    async def update_user(self, db: AsyncSession, *, db_obj: User, obj_in: UserUpdate) -> User:
        if obj_in.password:
            obj_in.password = get_password_hash(obj_in.password)  # type: ignore
        set_attrs(db_obj, obj_in)
        db.add(db_obj)
        await db.commit()
        return db_obj


user = CRUDUser(User)
