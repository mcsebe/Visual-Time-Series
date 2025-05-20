from typing import List, Union, Dict, Any

from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os

from models.Arima import Arima_Model
from scrap.Scrap import ScrapeTopGames

app = FastAPI()

load_dotenv()
DOMAIN_CORS = os.getenv("DOMAIN_CORS")
API_HISTORY_URL = os.getenv("API_HISTORY_URL")

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

@app.get("/topgames")
def top_games():
    return ScrapeTopGames()

@app.get("/history/{id}")
async def game_history(id: str):
    try:
        url = f"{API_HISTORY_URL}/{id}/chart-data.json"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPError as e:
        return {"error": f"Failed to fetch game history: {str(e)}"}


@app.put("/arima")
def arima(request: ModelRequest):
    return Arima_Model(request.data, request.params, request.number_test, request.number_predict)