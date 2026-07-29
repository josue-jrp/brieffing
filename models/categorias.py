from fastapi import APIRouter
import json


router = APIRouter()

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
async def categoria(categoria: str):
    
    resultado = ler_json_produtos(categoria=categoria)

    categorias = sorted(
        {
            produto['categoria'] for produto in resultado
        }
    )

    return {"resultados": resultado,
            "qtd_resultados":len(resultado),
            "quantidade": len(resultado),
            "categorias": categorias
            }