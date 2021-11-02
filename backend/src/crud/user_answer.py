from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from ..models.user_answer import UserAnswer
from ..schemas.user_answer import UserAnswerCreate, UserAnswerUpdate
from ..utils import set_attrs
from .base import CRUDBase


class CRUDUserAnswer(CRUDBase[UserAnswer, UserAnswerCreate, UserAnswerUpdate]):
    async def get_user_answer(
        self,
        db: AsyncSession,
        *,
        task_id: int,
        olympiad_id: int,
        user_id: int,
    ) -> Optional[UserAnswer]:
        result = await db.execute(
            select(self.model).where(
                self.model.task_id == task_id,
                self.model.olympiad_id == olympiad_id,
                self.model.user_id == user_id,
            )
        )

        return result.scalar()

    async def create_user_answer(
        self,
        db: AsyncSession,
        *,
        obj_in: UserAnswerCreate,
        db_obj: Optional[UserAnswer] = None,
        user_id: int,
    ) -> UserAnswer:
        if db_obj:
            set_attrs(db_obj, obj_in)
            db.add(db_obj)
            await db.commit()
            return db_obj
        new_db_obj = self.model(**obj_in.dict(), user_id=user_id)
        db.add(new_db_obj)
        await db.commit()
        return new_db_obj

    async def get_results(self, db: AsyncSession, *, olympiad_id: int, user_id: int) -> list[UserAnswer]:
        result = await db.execute(
            select(UserAnswer)
            .where(UserAnswer.user_id == user_id, UserAnswer.olympiad_id == olympiad_id)
            .options(joinedload(UserAnswer.task))
        )

        user_answers = result.scalars().all()
        return user_answers


user_answer = CRUDUserAnswer(UserAnswer)
