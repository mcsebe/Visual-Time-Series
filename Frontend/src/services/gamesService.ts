import { GameData } from "../types/games";
import api from "./main";


export const getTopGames = async (): Promise<GameData[]> => {
  try {
    const response = await api.get(`/topgames`);
    return response.data
  } catch (error) {
    throw new Error((error as Error).message)
  }
}