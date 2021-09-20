import os
from datetime import timedelta

from dotenv import dotenv_values
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from src.backend.utils import authenticate_user, create_access_token
from . import router

if os.getenv('ENV') == 'development':
    ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')
else:
    ACCESS_TOKEN_EXPIRE_MINUTES = dotenv_values('.env')['ACCESS_TOKEN_EXPIRE_MINUTES']


class Token(BaseModel):
    access_token: str
    token_type: str


@router.post('/api/token', response_model=Token, tags=['Authorization'])
async def get_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Неверный логин или пароль',
            headers={'WWW-Authenticate': 'Bearer'}
        )
    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={'sub': str(user.id)}, expires_delta=access_token_expires
    )
    return {'access_token': access_token, 'token_type': 'bearer'}


def add_route(app):
    app.include_router(router)