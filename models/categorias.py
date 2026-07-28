from fastapi import APIRouter
import json


router = APIRouter()

@router.get('/categoria/{categoria}')
async def categoria(categoria: str):
    with open('produtos.json', 'r', encoding='utf-8')as file:
        produtos = json.load(file)

    resultado = [
        produto for produto in produtos if produto['categoria'].lower() == categoria.lower()
    ]

    return {"res": resultado}