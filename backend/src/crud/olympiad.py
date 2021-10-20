from src.models.olympiad import Olympiad
from src.schemas.olympiad import OlympiadCreate, OlympiadUpdate

from .base import CRUDBase


class CRUDOlympiad(CRUDBase[Olympiad, OlympiadCreate, OlympiadUpdate]):
    pass


olympiad = CRUDOlympiad(Olympiad)
