import uvicorn

from configs.project_variables import *
from build_ep.load_routes import load_routes
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI

app = FastAPI()
app.mount('/assets', StaticFiles(directory='src/frontend/assets'), name='assets')


def get_app():
    load_routes(app)
    return app


if __name__ == '__main__':
    uvicorn.run('main:get_app', host='127.0.0.1', port=8000, reload=True, factory=True)