from fastapi.routing import APIRouter

router = APIRouter()

front = open('src/frontend/assets/html/app.html', 'r')

router.front = front.read()
