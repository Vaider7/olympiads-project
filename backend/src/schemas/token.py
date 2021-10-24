from pydantic import BaseModel

from src.custom_types.postitve_int import positive_int


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenPayload(BaseModel):
    user_id: positive_int
    scopes: list[str] = []
