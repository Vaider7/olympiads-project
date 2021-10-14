from typing import Any

from fastapi import Depends, FastAPI, HTTPException, APIRouter
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from src import crud, models, schemas
from src.deps import deps


router = APIRouter()


@router.post("/api/signup")
async def signup(*, db: AsyncSession = Depends(deps.get_db), user_data: schemas.user.UserCreate) -> Any:
    """
    Create new user
    """
    check_user = await crud.user.get_by_username(db, username=user_data.username)
    if check_user:
        raise HTTPException(
            status_code=400,
            detail="Указанная почта уже занята",
        )
    await crud.user.create(
        db,
        user_data=user_data,
    )

    return


@router.post("/test/user")
async def test(*, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    return current_user.id


def add_route(app: FastAPI) -> Any:
    app.include_router(router)
