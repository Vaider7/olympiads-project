import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from loaders.load_routes import load_routes
from src.core.project_variables import init_project_variables

init_project_variables()


app = FastAPI()


app.mount("/assets", StaticFiles(directory="../frontend/assets"), name="assets")


def get_app() -> FastAPI:
    load_routes(app)
    return app


if __name__ == "__main__":
    uvicorn.run("main:get_app", host="localhost", port=8000, reload=True, factory=True)
