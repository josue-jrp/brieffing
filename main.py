from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from models import produtos, home, categorias

app = FastAPI()



app.include_router(home.router)
app.include_router(categorias.router)
app.include_router(produtos.router)