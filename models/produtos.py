from fastapi import APIRouter, Request
import json
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from models.categorias import ler_json_produtos


router = APIRouter()

# Pasta dos arquivos estáticos
router.mount("/static", StaticFiles(directory="static"), name="static")

# Pasta dos templates
templates = Jinja2Templates(directory="templates")


@router.get("/produtos")
async def produtos():
    with open('produtos.json', 'r', encoding='utf-8') as file:
        content = json.load(file)

    return {'produtos': content}

@router.get("/pesquisa")
async def pesquisa(request: Request):
    return templates.TemplateResponse(
        request=request,
        name='pesquisa.html',
        context={'title': 'olá mundo'}
    )