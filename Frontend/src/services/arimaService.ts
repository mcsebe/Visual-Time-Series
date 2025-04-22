import { ArimaResponse, ArimaRequest } from '../types/arima';
import api from "./main";


export const postArima = async (payload: ArimaRequest): Promise<ArimaResponse> => {
  try {
    const response = await api.put(`/arima`, payload);
    return response.data
  } catch (error) {
    throw new Error((error as Error).message)
  }
}