# import secrets

from pydantic import BaseSettings


class Settings(BaseSettings):
    ENV: str = "development"
    API_V1_STR: str = "localhost"
    SECRET_KEY: str = "DSwz3U2CodwKdNenRLRLMyT51YyFGlEZGQxSjwWxRl4"  # secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 30 * 6
    SERVER_NAME: str = "my_local_network"
    SERVER_HOST: str = "https://localhost"
    PROJECT_NAME = "olympiads"

    POSTGRES_DRIVER = "asyncpg"
    POSTGRES_SERVER = "localhost"
    POSTGRES_USER = "vaider"
    POSTGRES_PASSWORD = "a44668631"
    POSTGRES_DB = "olympiads"
    POSTGRES_PORT = "5432"

    SQLALCHEMY_DATABASE_URI: str = (
        f"postgresql+"
        f"{POSTGRES_DRIVER}://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
    )

    DB_ECHO = True
    DB_POOL_SIZE = 8
    DB_MAX_OVERFLOW = 10
    DB_POOL_TIMEOUT = 30

    class Config:
        case_sensitive = True


settings = Settings()
