import os
from importlib import import_module

files = os.listdir('src/backend/routes')


def load_routes(app):
    for file_name in files:
        if file_name == '__init__.py' or file_name == '__pycache__':
            continue
        route = import_module(f'..{file_name[:-3]}', f'src.backend.routes.{file_name[:-3]}')
        add_route = route.__getattribute__('add_route')
        add_route(app)
