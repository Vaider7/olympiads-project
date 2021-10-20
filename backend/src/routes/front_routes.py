import os
from typing import Any

from fastapi import APIRouter, FastAPI
from fastapi.responses import HTMLResponse

from src.core.front_paths import front_paths

router = APIRouter(tags=["Front Pages"])

front_app = open("../frontend/assets/html/app.html", "r").read()


def get_front() -> str:
    if os.getenv("ENV") == "development":
        with open("../frontend/assets/html/app.html", "r") as f:
            return f.read()
    return front_app


for path in front_paths:

    @router.get(path, response_class=HTMLResponse)
    async def front_page() -> Any:
        return get_front()


def add_route(app: FastAPI) -> None:
    app.include_router(router)
