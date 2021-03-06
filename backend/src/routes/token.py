from typing import Any

from fastapi import APIRouter, Depends, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from src import crud, schemas
from src.core.security import create_access_token
from src.deps import deps
from src.schemas import TokenPayload

router = APIRouter(tags=["Token"])


@router.post("/api/token", response_model=schemas.Token)
async def access_token(
    db: AsyncSession = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Any:
    user = await crud.user.authenticate(db, username=form_data.username, password=form_data.password)

    if not user:
        raise HTTPException(status_code=400, detail="Неверный логин или пароль")

    scopes = ["student"]
    if "@tyuiu.ru" in user.username:
        scopes.append("teacher")

    return {
        "access_token": create_access_token(TokenPayload(user_id=user.id, scopes=scopes)),
        "token_type": "bearer",
    }


def add_route(app: FastAPI) -> None:
    app.include_router(router)
