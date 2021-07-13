import os

from . import router


@router.get('/')
async def index():
    return 'hello world!'


def add_route(app):
    app.include_router(router)
