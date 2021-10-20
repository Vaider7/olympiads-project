from typing import Optional

from pydantic import BaseModel, Field, PositiveInt


class AnswerBase(BaseModel):
    no: PositiveInt = Field(..., example=1)
    possible_answer: str = Field(..., example="Vanya have 5 apples")


class AnswerCreate(AnswerBase):
    verity: bool


class AnswerUpdate(AnswerBase):
    verity: bool
