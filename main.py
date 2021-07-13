from configs.project_variables import *
from build_ep.load_routes import load_routes

from fastapi import FastAPI

app = FastAPI()


def get_app():
    load_routes(app)
    return app