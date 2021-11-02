from enum import Enum


class task_type(str, Enum):
    ONE = "one"
    MULTI = "multi"
    TYPED = "typed"
    FREE = "free"
