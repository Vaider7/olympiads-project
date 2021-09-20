import os

import uvicorn

from configs.project_variables import init_project_variables
from loaders.load_routes import load_routes
from loaders.load_middlewares import load_middlewares
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI

init_project_variables()

if os.getenv('ENV') == 'development':
    app = FastAPI()
else:
    app = FastAPI(docs_url=None, redoc_url=None)


app.mount('/assets', StaticFiles(directory='src/frontend/assets'), name='assets')


def get_app():
    load_routes(app)
    load_middlewares(app)
    return app


if __name__ == '__main__':
    uvicorn.run('main:get_app', host='127.0.0.1', port=8000, reload=True, factory=True)