from configs.project_variables import *
from build_ep.load_routes import load_routes
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI

app = FastAPI()
app.mount('/assets', StaticFiles(directory='src/frontend/assets'), name='assets')


def get_app():
    load_routes(app)
    return app