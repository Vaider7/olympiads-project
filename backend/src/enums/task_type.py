from enum import Enum


class TaskType(str, Enum):
    ONE = "one"
    MULTI = "multi"
    HANDWRITTEN = "handwritten"
    FREE = "free"
