from fastapi import HTTPException, status
from . import router
from pydantic import BaseModel, Field
from db import async_session
from src.backend.models.User import User
from sqlalchemy import select
from src.backend.utils import get_password_hash, create_access_token


class NewPerson(BaseModel):
    username: str = Field(..., max_length=64, regex='(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)')
    password: str = Field(..., max_length=22, min_length=6)
    firstname: str = Field(..., max_length=64)
    lastname: str = Field(..., max_length=64)


@router.post('/api/signup', tags=['Authorization'])
async def login(new_person: NewPerson):
    # async with async_session() as session:
    stmt = select(User).where(User.username == new_person.username)
    result = await async_session().execute(stmt)
    user = result.scalar()

    if user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Указанная почта уже занята')

    password = get_password_hash(new_person.password)

    new_user = User(
        username=new_person.username,
        password=password,
        firstname=new_person.firstname,
        lastname=new_person.lastname
    )
    async_session().add(new_user)
    await async_session().commit()
    token = create_access_token({'user_id': str(new_user.id)})
    return {'access_token': token}


def add_route(app):
    app.include_router(router)
