from importlib.metadata import entry_points


def load_models():
    for ep in entry_points()['models']:
        ep.load()
