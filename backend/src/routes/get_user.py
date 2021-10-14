# from fastapi import Depends
# from pydantic import BaseModel
#
# from ..utils import get_current_user as gcr
from fastapi import APIRouter

router = APIRouter()


#
#
# class User(BaseModel):
#     id: int
#     username: str
#     lastname: str
#     firstname: str
#
#
# @router.post("/api/user/get", response_model=User, tags=["Users"])
# async def get_current_user(user: User = Depends(gcr)):
#     return vars(user)
#
#
def add_route(app) -> None:
    app.include_router(router)
