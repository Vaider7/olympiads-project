from typing import Any

from fastapi import APIRouter, Depends, FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.ext.asyncio import AsyncSession

from src import crud, models, schemas
from src.core.security import get_password_hash
from src.deps import deps

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
            detail="Указанная почта уже занята",
        )
    user_data.password = get_password_hash(user_data.password)  # type: ignore[assignment]
    await crud.user.create(
        db,
        obj_in=user_data,
    )

    return


@router.post("/api/users/shit")
async def test(*, current_user: models.User = Depends(deps.get_current_user)) -> Any:
    return current_user


@router.post("/api/users/update")
async def shit(
    *,
    db: AsyncSession = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_user),
    to_update: schemas.user.UserUpdate
) -> Any:
    current_user_data = jsonable_encoder(current_user)
    user_in = schemas.user.UserUpdate(**current_user_data)

    for field in to_update:
        setattr(user_in, field[0], field[1])

    return current_user.id


def add_route(app: FastAPI) -> None:
    app.include_router(router)
