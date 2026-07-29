from fastapi import APIRouter, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from models.categorias import ler_json_produtos


router = APIRouter()


# Pasta dos arquivos estáticos
router.mount("/static", StaticFiles(directory="static"), name="static")

# Pasta dos templates
templates = Jinja2Templates(directory="templates")

@router.get('/')
async def home(request: Request):

    prod_freios = ler_json_produtos(categoria='freios')
    prod_motor = ler_json_produtos(categoria='motor')
    prod_suspensao = ler_json_produtos(categoria='suspensao')
    prod_eletrica = ler_json_produtos(categoria='eletrica')
    prod_filtros = ler_json_produtos(categoria='filtros')

    return templates.TemplateResponse(
        request=request,
        name='index.html',
        context={
            "titulo": 'olá mundo',
            "freios": len(prod_freios),
            "motor": len(prod_motor),
            "suspensao": len(prod_suspensao),
            "eletrica": len(prod_eletrica),
            "filtros": len(prod_filtros)
        }
    )