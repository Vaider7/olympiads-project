from typing import Optional

from pydantic import BaseModel

from ..custom_types.non_negative_int import non_negative_int
from ..custom_types.postitve_int import positive_int
from ..enums.task_type import TaskType
from .answer import AnswerBase, AnswerCreate


class TaskBase(BaseModel):
    name: Optional[str]
    description: str
    question: str
    task_type: TaskType
    points: non_negative_int

    class Config:
        use_enum_values = True


class TaskCreate(TaskBase):
    answers: list[AnswerCreate]
    olympiad_id: Optional[positive_int] = None


class TaskCreateInOlympiad(TaskBase):
    answers: list[AnswerCreate]


class TaskUpdate(TaskBase):
    answers: list[AnswerCreate]
    id: positive_int


class TaskInDB(TaskBase):
    id: positive_int

    class Config:
        orm_mode = True


class Task(TaskInDB):
    answers: list[AnswerBase]
