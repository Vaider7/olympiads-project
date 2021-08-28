from fastapi.requests import Request


def func_wrapper(app):
    @app.middleware('http')
    async def hi(request: Request, call_next):
        print('hello')
        return await call_next(request)
