import { GameHistory } from "../types/gameHistory";
import api from "./main";

export const getGameHistory = async (id: number): Promise<GameHistory> => {
  try {
    const response = await api.get(`/history/${id}`);
    return response.data
  } catch (error) {
    throw new Error((error as Error).message)
  }
}