from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from src.custom_types.postitve_int import positive_int


class RegisteredUserBase(BaseModel):
    olympiad_id: positive_int


class RegisteredUserCreate(RegisteredUserBase):
    user_id: positive_int


class RegisteredUserUpdate(RegisteredUserBase):
    is_finished: Optional[bool] = None
    start_time: Optional[datetime]
    end_time: Optional[datetime]


class RegisteredUserStart(BaseModel):
    start_time: datetime
    end_time: datetime
    is_finished: bool


class RegisteredUserInDB(RegisteredUserBase):
    id: positive_int
    end_time: Optional[datetime] = None
    start_time: Optional[datetime] = None
    is_finished: Optional[bool] = None
    user_id: positive_int

    class Config:
        orm_mode = True


class RegisteredUser(RegisteredUserInDB):
    pass
