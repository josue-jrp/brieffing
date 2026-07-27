from fastapi import APIRouter

router = APIRouter()

@router.get("/produtos")
async def produtos():
    return {'stt':'ok'}