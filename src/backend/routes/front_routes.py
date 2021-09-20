import os
from . import router
from configs.front_paths import front_paths
from fastapi.responses import HTMLResponse

front_app = open('src/frontend/assets/html/app.html', 'r').read()


def get_front():
    if os.getenv('ENV') == 'development':
        with open('src/frontend/assets/html/app.html', 'r') as f:
            return f.read()
    return front_app


for path in front_paths:
    @router.get(path, response_class=HTMLResponse, tags=['Front Pages'])
    async def front_page():
        return get_front()


def add_route(app):
    app.include_router(router)