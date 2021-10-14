from typing import AsyncGenerator
from ast import literal_eval
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession

from src.core import security
from src.core.config import settings
from src import crud, models, schemas
from src.db.session import async_session

reusable_oauth2 = OAuth2PasswordBearer(tokenUrl="/api/token")


async def get_db() -> AsyncGenerator:
    try:
        async with async_session() as session:
            yield session
    finally:
        await session.close()


async def get_current_user(db: AsyncSession = Depends(get_db), token: str = Depends(reusable_oauth2)) -> models.User:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[security.ALGORITHM])
        token_data = schemas.TokenPayload(**literal_eval(payload['sub']))
    except (jwt.JWTError, ValidationError):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Пользователь не найден")
    user = await crud.user.get(db, id=token_data.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Пользователь не найден")
    return user
