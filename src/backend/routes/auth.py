from . import router
from pydantic import BaseModel, Field
from db import async_session
from ..models.User import User


class Person(BaseModel):
    username: str
    password: str


class NewPerson(BaseModel):
    username: str = Field(..., max_length=64, regex='(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)')
    password: str = Field(..., max_length=22, min_length=6)
    firstname: str = Field(..., max_length=64)
    lastname: str = Field(..., max_length=64)


@router.post('/api/auth/login')
async def signup(person: Person):
    print(person)
    return person


@router.post('/api/auth/signup')
async def login(new_person: NewPerson):

    async with async_session() as session:
        new_person = User(
            username=new_person.username,
            password=new_person.password,
            firstname=new_person.firstname,
            lastname=new_person.lastname
        )
        print(new_person)
        session.add(new_person)
        await session.commit()
    return


def add_route(app):
    app.include_router(router)
