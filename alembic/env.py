from os import getenv
from sqlalchemy import create_engine
from configs.project_variables import init_project_variables

from alembic import context

from src.backend.models import Base
from loaders.load_models import load_models

init_project_variables()
load_models()
target_metadata = Base.metadata


if getenv('ENV') == 'development':
    from configs.db_config import DevConf as Conf
elif getenv('ENV') == 'production':
    from configs.db_config import ProdConf as Conf


def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = create_engine(
        f'postgresql+psycopg2://{Conf.DB_USER}:{Conf.DB_PASSWD}@{Conf.DB_HOST}:{Conf.DB_PORT}/{Conf.DB_DATABASE}'
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


run_migrations_online()
