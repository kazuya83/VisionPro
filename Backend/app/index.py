import os
import global_value as g
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

# routers import
from Routers.Navigation import navigation_router

load_dotenv()
g.DB_HOST = os.environ['DB_HOST']
g.DB_DATABASE = os.environ['DB_DATABASE']
g.DB_USER = os.environ['DB_USER']
g.DB_PASS = os.environ['DB_PASS']

app = FastAPI()

print('test')

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

app.include_router(navigation_router.router)

@app.get("/")
def Hello():
    return {"Hello":"World!"}