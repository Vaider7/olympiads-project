from pydantic import BaseModel, Field

from src.custom_types.postitve_int import positive_int


class AnswerBase(BaseModel):
    no: positive_int
    possible_answer: str = Field(..., example="Vanya have 5 apples")


class AnswerCreate(AnswerBase):
    verity: bool


class AnswerUpdate(AnswerBase):
    verity: bool


class Answer(AnswerBase):
    verity: bool

    class Config:
        orm_mode = True
