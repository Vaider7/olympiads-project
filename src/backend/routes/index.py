from fastapi.responses import HTMLResponse

from . import router


@router.get('/', response_class=HTMLResponse)
async def index():
    return router.get_front()


def add_route(app):
    app.include_router(router)
