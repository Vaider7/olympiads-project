import os

from fastapi.responses import HTMLResponse

from src.core.front_paths import front_paths

from fastapi import APIRouter

router = APIRouter()

front_app = open("../frontend/assets/html/app.html", "r").read()


def get_front() -> str:
    if os.getenv("ENV") == "development":
        with open("../frontend/assets/html/app.html", "r") as f:
            return f.read()
    return front_app


for path in front_paths:

    @router.get(path, response_class=HTMLResponse, tags=["Front Pages"])
    async def front_page():
        return get_front()


def add_route(app):
    app.include_router(router)
