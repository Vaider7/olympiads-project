from setuptools import setup
from get_models import get_models
from get_routes import get_routes

setup(
    name='project_ep',
    entry_points={
        'models': get_models(),
        'routes': get_routes()
    }
)
