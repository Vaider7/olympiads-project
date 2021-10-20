from typing import Any

from fastapi import APIRouter, Body, Depends, FastAPI, HTTPException, Path
from pydantic import PositiveInt
from sqlalchemy.ext.asyncio import AsyncSession

from src import crud, schemas
from src.deps import deps

router = APIRouter(tags=["Olympiads"])


@router.post("/api/olympiads/create")
async def create_olympiad(
    *, db: AsyncSession = Depends(deps.get_db), olympiad_data: schemas.OlympiadCreate
) -> Any:
    """
    Create new olympiad
    - **name**: name of olympiad
    - **discipline**: discipline of olympiad
    - **start**: time of start of olympiad
    - **end**: time of end of olympiad
    - **duration**: duration for one attempt
    """
    await crud.olympiad.create(db, obj_in=olympiad_data)

    return


@router.delete("/api/olympiads/delete")
async def delete_olympiad(
    *,
    db: AsyncSession = Depends(deps.get_db),
    olympiad_id: PositiveInt = Body(..., example=1)
) -> Any:
    """
    Remove olympiad
    - **id**: id of olympiad
    """

    olympiad = await crud.olympiad.remove(db, id=olympiad_id)

    if not olympiad:
        raise HTTPException(
            status_code=404,
            detail="Олимпиада не найдена",
        )

    return


@router.put("/api/olympiads/update")
async def update_olympiad(
    *, db: AsyncSession = Depends(deps.get_db), olympiad_data: schemas.OlympiadUpdate
) -> Any:
    """
    Create new olympiad
    - **id**: id of olympiad
    - **name**: name of olympiad
    - **discipline**: discipline of olympiad
    - **start**: time of start of olympiad
    - **end**: time of end of olympiad
    - **duration**: duration for one attempt
    """
    olympiad = await crud.olympiad.update(db, obj_in=olympiad_data)

    if not olympiad:
        raise HTTPException(
            status_code=404,
            detail="Олимпиада не найдена",
        )

    return


@router.get("/api/olympiads/get", response_model=list[schemas.Olympiad])
async def get_olympiads(*, db: AsyncSession = Depends(deps.get_db)) -> Any:
    olympiads = await crud.olympiad.get_multi(db)
    return olympiads


@router.get("/api/olympiads/{olympiad_id}", response_model=schemas.Olympiad)
async def get_olympiad(
    *,
    db: AsyncSession = Depends(deps.get_db),
    olympiad_id: PositiveInt = Path(..., example=1)
) -> Any:
    olympiad = await crud.olympiad.get(db, id=olympiad_id)
    if not olympiad:
        raise HTTPException(
            status_code=404,
            detail="Олимпиада не найдена",
        )

    return olympiad


def add_route(app: FastAPI) -> None:
    app.include_router(router)
