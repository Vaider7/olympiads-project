from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..custom_types.postitve_int import positive_int
from ..models.user_answer import UserAnswer
from ..schemas.user_answer import UserAnswerCreate, UserAnswerUpdate
from .base import CRUDBase


class CRUDUserAnswer(CRUDBase[UserAnswer, UserAnswerCreate, UserAnswerUpdate]):
    async def get_user_answer(
        self,
        db: AsyncSession,
        *,
        task_id: positive_int,
        registered_user_id: positive_int
    ) -> UserAnswer:
        result = await db.execute(
            select(self.model).where(
                self.model.task_id == task_id,
                self.model.registered_user_id == registered_user_id,
            )
        )

        return result.scalar()


user_answer = CRUDUserAnswer(UserAnswer)
