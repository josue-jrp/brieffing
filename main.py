from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from models import produtos

app = FastAPI()

app.include_router(produtos.router)