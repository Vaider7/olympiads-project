import os
from pathlib import Path
from re import findall

models: list = os.listdir('src/backend/models')

models_dir: str = f'{Path(__file__).parent.parent}/src/backend/models'

entry_points = []


def get_models():
    for model in models:
        if model == '__init__.py' or model == '__pycache__':
            continue
        print(model)
        with open(f'{models_dir}/{model}', 'r') as file:
            file_content: str = file.read()
            classes = findall('class\s*\w*', file_content)
            for cls in classes:
                cls = cls.split(' ')[1]
                entry_points.append(f'{cls} = src.backend.models.{model[:-3]}:{cls}')
    return entry_points
