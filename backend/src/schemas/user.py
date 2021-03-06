from typing import Optional

from pydantic import BaseModel, EmailStr, Field

from src.custom_types.postitve_int import positive_int


class UserBase(BaseModel):
    username: EmailStr
    firstname: str = Field(..., max_length=64)
    lastname: str = Field(..., max_length=64)


class UserCreate(UserBase):
    password: str = Field(..., max_length=22, min_length=6)


class UserUpdate(UserBase):
    password: Optional[str] = None


class UserInDBBase(UserBase):
    id: Optional[positive_int] = None

    class Config:
        orm_mode = True


class User(UserInDBBase):
    pass
