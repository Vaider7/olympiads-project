from sqlalchemy import Column, ForeignKey, Integer

from src.db.base_class import Base


class UserAnswer(Base):
    registered_user_id = Column(Integer, ForeignKey("registered_users.id"))
    task_id = Column(Integer, ForeignKey("tasks.id"))
    answer_no = Column(Integer, nullable=False)
    #  answer = [""]
