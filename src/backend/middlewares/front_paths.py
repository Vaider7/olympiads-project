from fastapi.requests import Request


def func_wrapper(app):
    @app.middleware('http')
    async def hi(request: Request, call_next):
        print(request.url.path)

        response = await call_next(request)
        return response
