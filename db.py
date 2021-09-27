from configs.project_variables import *
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

if os.environ.get('ENV') == 'development':
    from configs.db_config import DevConf as Conf
elif os.environ.get('ENV') == 'production':
    from configs.db_config import ProdConf as Conf

engine = create_async_engine(
    f'postgresql+asyncpg://{Conf.DB_USER}:{Conf.DB_PASSWD}@{Conf.DB_HOST}:{Conf.DB_PORT}/{Conf.DB_DATABASE}',
    echo=Conf.DB_ECHO,
    pool_size=Conf.DB_POOL_SIZE,
    max_overflow=Conf.DB_MAX_OVERFLOW,
    pool_timeout=Conf.DB_POOL_TIMEOUT,
    future=True
)

async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession, autocommit=False, autoflush=False)
