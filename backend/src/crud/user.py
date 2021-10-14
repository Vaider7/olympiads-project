from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.security import get_password_hash, verify_password
from src.models.user import User
from src.schemas.user import UserCreate, UserUpdate

from .base import CRUDBase


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    async def get_by_username(self, db: AsyncSession, username: str) -> Optional[User]:
        stmt = select(User).where(User.username == username)
        result = await db.execute(stmt)
        user = result.scalar()
        return user

    async def create(self, db: AsyncSession, user_data: UserCreate) -> User:
        user = User(
            username=user_data.username,
            password=get_password_hash(user_data.password),
            firstname=user_data.firstname,
            lastname=user_data.lastname,
        )
        db.add(user)
        await db.commit()
        return user

    async def authenticate(self, db: AsyncSession, *, username: str, password: str) -> Optional[User]:
        user = await self.get_by_username(db, username=username)
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user


user = CRUDUser(User)
