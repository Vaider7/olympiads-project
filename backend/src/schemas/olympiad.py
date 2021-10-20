from datetime import datetime

from pydantic import BaseModel, Field, PositiveInt, NonNegativeInt


class OlympiadBase(BaseModel):
    name: str = Field(..., max_length=64)
    discipline: str = Field(..., max_length=64)
    start: datetime
    end: datetime
    duration: NonNegativeInt = Field(..., example=100)


class OlympiadCreate(OlympiadBase):
    pass


class OlympiadUpdate(OlympiadBase):
    id: PositiveInt = Field(..., example=1)


class OlympiadInDB(OlympiadBase):
    id: PositiveInt = Field(..., example=1)

    class Config:
        orm_mode = True


class Olympiad(OlympiadInDB):
    pass
