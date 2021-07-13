from starlette.config import Config


class DevConf:
    DB_USER = 'vaider'
    DB_PASSWD = ''
    DB_HOST = 'localhost'
    DB_PORT = 5432
    DB_DATABASE = 'olympiads'
    DB_ECHO = True
    DB_POOL_SIZE = 8
    DB_MAX_OVERFLOW = 10
    DB_POOL_TIMEOUT = 30


ProdConf = Config('.env')

DB_HOST = ProdConf('DB_HOST', cast=int, default=None)
DB_PORT = ProdConf('DB_PORT', cast=int, default=5432)
DB_USER = ProdConf('DB_USER', cast=str, default=None)
DB_PASSWD = ProdConf('DB_PASSWORD', cast=str, default=None)
DB_DATABASE = ProdConf('DB_DATABASE', cast=str, default=None)
DB_ECHO = ProdConf('DB_ECHO', cast=bool, default=False)
DB_POOL_SIZE = ProdConf('DB_POOL_SIZE', cast=int, default=5)
DB_MAX_OVERFLOW = ProdConf('DB_MAX_OVERFLOW', cast=int, default=10)
DB_POOL_TIMEOUT = ProdConf('DB_POOL_TIMEOUT', cast=int, default=30)

