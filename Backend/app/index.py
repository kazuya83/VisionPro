import os
import global_value as g
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

# routers import
from Routers.Navigation import NavigationRouter
from Routers.Login import LoginRouter
from Routers.AttributeVariable import AttributeVariableRouter
from Routers.Master import MasterRouter

# TODO:一時
import Common.db_common as DB

load_dotenv()
g.DB_HOST = os.environ['DB_HOST']
g.DB_DATABASE = os.environ['DB_DATABASE']
g.DB_USER = os.environ['DB_USER']
g.DB_PASS = os.environ['DB_PASS']
g.ENCRYPT_STR = os.environ['ENCRYPT_STR']

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(NavigationRouter.router)
app.include_router(LoginRouter.router)
app.include_router(AttributeVariableRouter.router)
app.include_router(MasterRouter.router)

@app.get("/")
def Hello():
    return {"Hello":"World!"}