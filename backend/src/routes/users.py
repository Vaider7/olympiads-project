from typing import Any, Optional

from fastapi import APIRouter, Depends, FastAPI, HTTPException, Security
from sqlalchemy.ext.asyncio import AsyncSession

from src import crud, schemas
from src.core.security import get_password_hash
from src.custom_types.postitve_int import positive_int
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


@router.get("/api/users/get", response_model=schemas.User)
async def get_user(
    *, db: AsyncSession = Depends(deps.get_db), current_user: User = Depends(deps.get_current_user)
) -> Any:
    user = await crud.user.get(db, id=current_user.id)
    return user


@router.get("/api/users/get-registered", response_model=list[Optional[positive_int]])
async def get_registered_olympiad(
    *, db: AsyncSession = Depends(deps.get_db), current_user: User = Security(deps.get_current_user, scopes=["student"])
) -> Any:
    olympiads = await crud.registered_user.get_olympiads(db, user_id=current_user.id)

    if olympiads:
        olympiad_ids = [olympiad.olympiad_id for olympiad in olympiads]
    else:
        olympiad_ids = []

    return olympiad_ids


def add_route(app: FastAPI) -> None:
    app.include_router(router)
