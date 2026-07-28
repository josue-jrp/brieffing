from fastapi import APIRouter, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


router = APIRouter()


# Pasta dos arquivos estáticos
router.mount("/static", StaticFiles(directory="static"), name="static")

# Pasta dos templates
templates = Jinja2Templates(directory="templates")

@router.get('/')
async def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name='index.html',
        context={
            'titulo': 'olá mundo'
        }
    )