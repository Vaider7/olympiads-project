import os
from datetime import datetime, timedelta
from os import getenv
from typing import Union, Optional
import pydantic

import bcrypt
from dotenv import dotenv_values
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy import select
from db import async_session
from .models.User import User

if getenv('ENV') == 'development':
    SECRET_KEY: str = 'a6b583249f451b497117cd296070f2b9'
    ALGORITHM = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')

else:
    SECRET_KEY = dotenv_values('.env')['SECRET_KEY']
    ALGORITHM = dotenv_values('.env')['ALGORITHM']
    ACCESS_TOKEN_EXPIRE_MINUTES = dotenv_values('.env')['ACCESS_TOKEN_EXPIRE_MINUTES']


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/api/token')


def verify_password(plain_password: str, hashed_password: bytes) -> bool:
    if bcrypt.checkpw(bytes(plain_password, 'utf-8'), hashed_password):
        return True
    return False


def get_password_hash(plain_password: str) -> bytes:
    return bcrypt.hashpw(bytes(plain_password, 'utf-8'), bcrypt.gensalt())


async def authenticate_user(username: str, password: str) -> Union[User, bool]:
    async with async_session() as session:
        stmt = select(User).where(User.username == username)
        result = await session.execute(stmt)
        user = result.scalar()

        if not user:
            return False

        if not verify_password(password, user.password):
            return False

        return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Невалидные данные авторизации",
        headers={"WWW-Authenticate": "Bearer"},
    )
    # try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    user_id: str = payload.get('sub')
    if user_id is None:
        raise credentials_exception
    # except JWTError:
    #     raise credentials_exception

    async with async_session() as session:
        stmt = select(User).where(User.id == int(user_id))
        result = await session.execute(stmt)
        user = result.scalar()

        return user
