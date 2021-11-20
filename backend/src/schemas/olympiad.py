from datetime import datetime
from typing import TYPE_CHECKING, Optional

from pydantic import BaseModel, Field, NonNegativeInt

from src.custom_types.postitve_int import positive_int

from .task import Task, TaskCreateInOlympiad

if TYPE_CHECKING:
    pass


class OlympiadBase(BaseModel):
    name: str = Field(..., max_length=64)
    discipline: str = Field(..., max_length=64)
    description: str
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
    tasks: Optional[list[Task]]
