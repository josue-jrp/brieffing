from fastapi import APIRouter
import json

router = APIRouter()

@router.get("/produtos")
async def produtos():
    with open('produtos.json', 'r', encoding='utf-8') as file:
        content = json.load(file)

    return {'produtos': content}