import os


def init_project_variables():
    os.environ['ENV'] = 'development'  # Switch to 'production' if you use prod server
    os.environ['DEBUG'] = 'False'  # True value can be used only in development environment
