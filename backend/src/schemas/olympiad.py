from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, NonNegativeInt, PositiveInt

from src.schemas.task import Task, TaskCreate


class OlympiadBase(BaseModel):
    name: str = Field(..., max_length=64)
    discipline: str = Field(..., max_length=64)
    start: datetime
    end: datetime
    duration: NonNegativeInt = Field(..., example=100)


class OlympiadCreate(OlympiadBase):
    tasks: Optional[list[TaskCreate]] = None


class OlympiadUpdate(OlympiadBase):
    id: PositiveInt = Field(..., example=1)


class OlympiadInDB(OlympiadBase):
    id: PositiveInt = Field(..., example=1)

    class Config:
        orm_mode = True


class Olympiad(OlympiadInDB):
    pass


class OlympiadWithTasks(OlympiadInDB):
    tasks: Optional[list[Task]] = None
