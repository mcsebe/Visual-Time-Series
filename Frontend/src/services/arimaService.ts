import axios from 'axios';
import { ArimaRequest } from '../types/arima';

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL as string;

export const postArima = async (payload: ArimaRequest) => {
  const response = await axios.put(`${BACKEND_URL}/arima`, payload);
  return response.data;
};
