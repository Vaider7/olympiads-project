from typing import Optional

from pydantic import BaseModel

from src.custom_types.non_negative_int import non_negative_int
from src.custom_types.postitve_int import positive_int
from src.schemas.answer import Answer


class ResultBase(BaseModel):
    task_name: str
    task_id: positive_int
    task_points: non_negative_int
    typed_answer: Optional[list[str]]
    task_answers: Optional[list[Answer]]
    right_answers: Optional[list[str]]
    user_answer: Optional[list[str]]
    user_points: float
    task_type: str

    class Config:
        orm_mode = True
