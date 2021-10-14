import os
from importlib import import_module

files = os.listdir("src/models")


def load_models() -> None:
    for file_name in files:
        if file_name == "__init__.py" or file_name == "__pycache__":
            continue
        import_module(f"..{file_name[:-3]}", f"src.models.{file_name[:-3]}")
