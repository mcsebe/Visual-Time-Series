from typing import List, Union, Dict, Any

from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os

from models.Arima import Arima_Model

app = FastAPI()

load_dotenv()
DOMAIN_CORS = os.getenv("DOMAIN_CORS")

origins = [DOMAIN_CORS]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ModelRequest(BaseModel):
    data: List[Union[int, float]]
    params: Dict[str, Any]
    number_test: int
    number_predict: int

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.POST("/ARIMA")
def read_item(request: ModelRequest):
    return Arima_Model(request.data, request.params, request.number_test, request.number_predict)