from typing import Optional

from pydantic import BaseModel, EmailStr, Field, PositiveInt


class UserBase(BaseModel):
    username: EmailStr
    firstname: str = Field(..., max_length=64)
    lastname: str = Field(..., max_length=64)


class UserCreate(UserBase):
    password: str = Field(..., max_length=22, min_length=6)


class UserUpdate(UserBase):
    password: Optional[str] = Field(None)


class UserInDBBase(UserBase):
    id: Optional[PositiveInt] = None

    class Config:
        orm_mode = True


class User(UserInDBBase):
    pass
