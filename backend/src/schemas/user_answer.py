from pydantic import BaseModel

from ..custom_types.postitve_int import positive_int


class UserAnswerBase(BaseModel):
    registered_user_id: positive_int
    task_id: positive_int
    answer_no: positive_int


class UserAnswerCreate(UserAnswerBase):
    pass


class UserAnswerUpdate(UserAnswerBase):
    pass


class UserAnswerInDB(BaseModel):
    id: positive_int

    class Config:
        orm_mode = True


class UserAnswer(UserAnswerInDB):
    pass
