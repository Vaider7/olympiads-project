from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, NonNegativeInt

from src.custom_types.postitve_int import positive_int
from src.schemas.task import Task, TaskCreateInOlympiad


class OlympiadBase(BaseModel):
    name: str = Field(..., max_length=64)
    discipline: str = Field(..., max_length=64)
    start: datetime
    end: datetime
    duration: NonNegativeInt = Field(..., example=100)


class OlympiadCreate(OlympiadBase):
    tasks: list[TaskCreateInOlympiad]


class OlympiadUpdate(OlympiadBase):
    id: positive_int


class OlympiadInDB(OlympiadBase):
    id: positive_int

    class Config:
        orm_mode = True


class Olympiad(OlympiadInDB):
    pass


class OlympiadWithTasks(OlympiadInDB):
    tasks: Optional[list[Task]] = None
