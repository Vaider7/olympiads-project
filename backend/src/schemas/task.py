from typing import Optional

from pydantic import BaseModel

from ..custom_types.non_negative_int import non_negative_int
from ..custom_types.postitve_int import positive_int
from ..enums.task_type import task_type
from .answer import AnswerBase, AnswerCreate


class TaskBase(BaseModel):
    name: Optional[str]
    description: str
    question: str
    task_type: task_type
    points: non_negative_int

    class Config:
        use_enum_values = True


class TaskCreate(TaskBase):
    answers: Optional[list[AnswerCreate]]
    typed_answers: Optional[list[str]]
    olympiad_id: Optional[positive_int] = None


class TaskCreateInOlympiad(TaskBase):
    answers: Optional[list[AnswerCreate]] = None
    typed_answers: Optional[list[str]]


class TaskUpdate(TaskBase):
    answers: Optional[list[AnswerCreate]]
    typed_answers: Optional[list[str]]
    id: positive_int


class TaskInDB(TaskBase):
    id: positive_int

    class Config:
        orm_mode = True


class Task(TaskInDB):
    answers: Optional[list[AnswerBase]]
