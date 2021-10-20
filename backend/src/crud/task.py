from src.models.task import Task
from src.schemas.task import TaskCreate, TaskUpdate

from .base import CRUDBase


class CRUDTask(CRUDBase[Task, TaskCreate, TaskUpdate]):
    pass


task = CRUDTask(Task)
