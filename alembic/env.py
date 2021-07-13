from sqlalchemy import create_engine

from dotenv import dotenv_values

from alembic import context

from src.backend.models import Base
from build_ep.load_models import load_models

load_models()
target_metadata = Base.metadata

env = dotenv_values()

if env['ENV'] == 'development':
    from configs.db_config import DevConf as Conf
elif env['ENV'] == 'production':
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
