from typing import Any

from fastapi import APIRouter, Depends, FastAPI, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src import crud, schemas
from src.core.security import get_password_hash
from src.deps import deps
from src.models import User

router = APIRouter(tags=["Users"])


@router.post("/api/users/signup")
async def signup(*, db: AsyncSession = Depends(deps.get_db), user_data: schemas.user.UserCreate) -> Any:
    """
    Create new user
    - **username**: unique username (email shape)
    - **password**: a very strong password
    - **firstname**: firstname of user
    - **lastname**: lastname of user
    """
    check_user = await crud.user.get_by_username(db, username=user_data.username)
    if check_user:
        raise HTTPException(
            status_code=400,
            detail="Аккаунт с данной почтой уже существует",
        )
    user_data.password = get_password_hash(user_data.password)  # type: ignore[assignment]
    await crud.user.create(
        db,
        obj_in=user_data,
    )

    return


@router.post("/api/users/get", response_model=schemas.User)
async def get_user(*, db: AsyncSession = Depends(deps.get_db), current_user: User = Depends(deps.get_current_user)):
    user = await crud.user.get(db, id=current_user.id)
    return user


def add_route(app: FastAPI) -> None:
    app.include_router(router)