from typing import TYPE_CHECKING

from sqlalchemy import ARRAY, Column, ForeignKey, Integer, String

from ..db.base_class import Base

if TYPE_CHECKING:
    from .task import Task


class UserAnswer(Base):
    user_id: int = Column(Integer, ForeignKey("users.id"))
    olympiad_id: int = Column(Integer, ForeignKey("olympiads.id"))
    task_id: int = Column(Integer, ForeignKey("tasks.id"))
    answer: list[str] = Column(ARRAY(String), nullable=False)  # type: ignore

    task: "Task"
