import os


def init_project_variables() -> None:
    os.environ["ENV"] = "development"  # Switch to 'production' if you use prod server
    os.environ["DEBUG"] = "True"  # True value can be used only in development environment
    os.environ["ACCESS_TOKEN_EXPIRE_MINUTES"] = "259200"
