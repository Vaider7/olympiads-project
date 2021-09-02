from fastapi.responses import HTMLResponse
from db import async_session
from . import router
from ..models.User import User


@router.get('/', response_class=HTMLResponse)
async def index():
    async with async_session() as session:
        session.add(User(nickname='loh'))
        await session.commit()
    return router.get_front()


def add_route(app):
    app.include_router(router)
