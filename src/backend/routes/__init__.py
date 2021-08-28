from fastapi.routing import APIRouter
import os

router = APIRouter()

front_file = open('src/frontend/assets/html/app.html', 'r')
router.front = front_file.read()


def get_front():
    if os.getenv('ENV') == 'development':
        with open('src/frontend/assets/html/app.html', 'r') as f:
            return f.read()
    return router.front


router.get_front = get_front
