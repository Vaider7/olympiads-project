from typing import Any

from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.security import create_access_token
from src import crud, schemas
from src.deps import deps
from fastapi import APIRouter

router = APIRouter()


@router.post("/api/token", response_model=schemas.Token)
async def access_token(
    db: AsyncSession = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Any:
    user = await crud.user.authenticate(db, username=form_data.username, password=form_data.password)

    if not user:
        raise HTTPException(status_code=400, detail="Неверный логин или пароль")

    return {"access_token": create_access_token({"user_id": user.id}), "token_type": "bearer"}


def add_route(app: FastAPI) -> None:
    app.include_router(router)
