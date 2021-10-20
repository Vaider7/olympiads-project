from datetime import datetime
from typing import Generic, Optional, Type, TypeVar

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.base_class import Base
from src.utils import set_attrs

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemeType = TypeVar("CreateSchemeType", bound=BaseModel)
UpdateSchemeType = TypeVar("UpdateSchemeType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemeType, UpdateSchemeType]):
    def __init__(self, model: Type[ModelType]):
        """
        CRUD object with default methods to Create, Read, Update, Delete (CRUD).
            **Parameters**
            * `model`: A SQLAlchemy model class
            * `schema`: A Pydantic model (schema) class
        """
        self.model = model

    async def get(self, db: AsyncSession, *, id: int, with_deleted: bool = False) -> Optional[ModelType]:
        if not with_deleted:
            stmt = select(self.model).where(self.model.id == id, self.model.deletedAt == None)
        else:
            stmt = select(self.model).where(self.model.id == id)
        result = await db.execute(stmt)

        return result.scalar()

    async def get_multi(
        self,
        db: AsyncSession,
        *,
        offset: int = 0,
        limit: int = 100,
        with_deleted: bool = False,
    ) -> list[ModelType]:
        if not with_deleted:
            stmt = select(self.model).where(self.model.deletedAt == None).offset(offset).limit(limit)
        else:
            stmt = select(self.model).offset(offset).limit(limit)
        result = await db.execute(stmt)

        return result.unique().scalars().all()

    async def update(
        self,
        db: AsyncSession,
        *,
        db_obj: Optional[ModelType] = None,
        obj_in: UpdateSchemeType,
    ) -> Optional[ModelType]:
        if db_obj is None:
            db_obj = await self.get(db, id=obj_in.id)  # type: ignore[attr-defined]
            if db_obj is None:
                return None
        obj_data = jsonable_encoder(obj_in)
        set_attrs(db_obj, obj_data)
        db.add(db_obj)
        await db.commit()
        return db_obj

    async def remove(self, db: AsyncSession, *, id: int) -> Optional[ModelType]:
        stmt = select(self.model).filter(self.model.id == id, self.model.deletedAt == None)
        result = await db.execute(stmt)
        db_obj = result.scalar()

        if not db_obj:
            return None

        db_obj.deletedAt = datetime.utcnow()
        await db.commit()
        return db_obj

    async def create(self, db: AsyncSession, *, obj_in: CreateSchemeType) -> ModelType:
        db_obj: ModelType = self.model()
        set_attrs(db_obj, obj_in)
        db.add(db_obj)
        await db.commit()
        return db_obj
