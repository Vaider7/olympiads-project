import os
from importlib.metadata import entry_points


def load_routes(app):
    for ep in entry_points()['routes']:
        add_route = ep.load()
        add_route(app)