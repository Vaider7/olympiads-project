from typing import Optional

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    username: EmailStr
    firstname: str
    lastname: str


class UserCreate(UserBase):
    password: str


class UserUpdate(UserBase):
    password: Optional[str] = None


class UserInDBBase(UserBase):
    id: int

    class Config:
        orm_mode = True


class User(UserInDBBase):
    pass


class UserInDB(UserInDBBase):
    hashed_password: str
