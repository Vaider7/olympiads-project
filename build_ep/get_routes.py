import os
from pathlib import Path

routes: list = os.listdir('src/backend/routes')

routes_dir: str = f'{Path(__file__).parent.parent}/src/backend/routes'

entry_points = []


def get_routes():
    for route in routes:
        print(route)
        if route == '__init__.py' or route == '__pycache__':
            continue
        entry_points.append(f'{route[:-3]} = src.backend.routes.{route[:-3]}:add_route')
    return entry_points
