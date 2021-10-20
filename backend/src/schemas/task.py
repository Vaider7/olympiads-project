from typing import Optional

from pydantic import BaseModel, Field, PositiveInt

from .answer import AnswerBase, AnswerCreate


class TaskBase(BaseModel):
    name: Optional[str]
    description: str
    question: str
    olympiad_id: PositiveInt = Field(..., example=1)


class TaskCreate(TaskBase):
    answers: list[AnswerCreate]


class TaskUpdate(TaskBase):
    answers: list[AnswerCreate]
    id: PositiveInt = Field(..., example=1)


class TaskInDB(TaskBase):
    id: PositiveInt = Field(..., example=1)

    class Config:
        orm_mode = True


class Task(TaskInDB):
    answers: list[AnswerBase]
