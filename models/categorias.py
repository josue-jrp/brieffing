from fastapi import APIRouter, Request
import json
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles


router = APIRouter()

# Pasta dos arquivos estáticos
router.mount("/static", StaticFiles(directory="static"), name="static")

# Pasta dos templates
templates = Jinja2Templates(directory="templates")




def ler_json_produtos(categoria=False):
    '''
        essa função lê o arquivo json de produtos porem retorna somente produtos filtrados por categoria e também quantidade de produtos encontrado pela determinada categoria

        retornos: 

        resultados
        qtd_resultados


    '''


    with open('produtos.json', 'r', encoding='utf-8')as file:
        produtos = json.load(file)

    resultado = [
        produto for produto in produtos if produto['categoria'].lower() == categoria.lower()
    ]

    return resultado


@router.get('/categoria/{categoria}')
async def categoria(request: Request, categoria: str):
    
    resultado = ler_json_produtos(categoria=categoria)

    categorias = sorted(
        {
            produto['categoria'] for produto in resultado
        }
    )

    return templates.TemplateResponse(
        request= request,
        name= "pesquisa.html",
        context= {
            "query":categoria,
            "resultados": resultado,
            "qtd_resultados":len(resultado),
            "quantidade": len(resultado),
            "categorias": categorias,
            }
    )

