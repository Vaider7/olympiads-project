from ast import literal_eval
from typing import AsyncGenerator, Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, SecurityScopes
from fastapi.security.utils import get_authorization_scheme_param
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.requests import Request

from src import crud, models, schemas
from src.core import security
from src.core.config import settings
from src.db.session import async_session


class RuOAuth2PasswordBearer(OAuth2PasswordBearer):
    async def __call__(self, request: Request) -> Optional[str]:
        authorization: str = request.headers.get("Authorization")
        scheme, param = get_authorization_scheme_param(authorization)
        if not authorization or scheme.lower() != "bearer":
            if self.auto_error:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Не авторизован",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            else:
                return None
        return param


reusable_oauth2 = RuOAuth2PasswordBearer(
    tokenUrl="/api/token",
    scopes={"student": "Take part in an Olympiad", "teacher": "Manage olympiads"},
)


async def get_db() -> AsyncGenerator:
    try:
        async with async_session() as session:
            yield session
    finally:
        await session.close()


async def get_current_user(
    db: AsyncSession = Depends(get_db),
    *,
    token: str = Depends(reusable_oauth2),
    security_scopes: SecurityScopes,
) -> models.User:
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = f"Bearer"
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Данные авторизации не прошли валидацию",
        headers={"WWW-Authenticate": authenticate_value},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = schemas.TokenPayload(**literal_eval(payload["sub"]))
    except (jwt.JWTError, ValidationError):
        raise credentials_exception
    user = await crud.user.get(db, id=token_data.user_id)
    if not user:
        raise credentials_exception
    for scope in security_scopes.scopes:
        if scope not in token_data.scopes:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Недостаточно прав",
                headers={"WWW-Authenticate": authenticate_value},
            )
    return user
