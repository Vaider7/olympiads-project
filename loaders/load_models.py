import os
from importlib import import_module

files = os.listdir('src/backend/models')


def load_models():
    for file_name in files:
        if file_name == '__init__.py' or file_name == '__pycache__':
            continue
        import_module(f'..{file_name[:-3]}', f'src.backend.models.{file_name[:-3]}')
