import importlib

f = importlib.import_module('..front_paths', package='src.backend.middlewares.front_paths')


def load_middlewares(app):
    func_wrapper = f.__getattribute__('func_wrapper')
    func_wrapper(app)