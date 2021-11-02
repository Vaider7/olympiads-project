from pydantic import BaseModel

from ..custom_types.postitve_int import positive_int
from ..schemas import Task


class UserAnswerBase(BaseModel):
    olympiad_id: positive_int
    task_id: positive_int
    answer: list[str]


class UserAnswerCreate(UserAnswerBase):
    pass


class UserAnswerUpdate(UserAnswerBase):
    pass


class UserAnswerInDB(UserAnswerBase):
    id: positive_int

    class Config:
        orm_mode = True


class UserAnswer(UserAnswerInDB):
    task: Task
