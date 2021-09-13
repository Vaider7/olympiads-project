from . import router
from pydantic import BaseModel


class Person(BaseModel):
    username: str
    password: str


class NewPerson(BaseModel):
    username: str
    password: str
    firstname: str
    lastname: str


@router.post('/api/auth/login')
async def login(person: Person):
    print(person)
    return person


@router.post('/api/auth/signup')
async def signup(new_person: NewPerson):
    print(new_person)
    return new_person


def add_route(app):
    app.include_router(router)