import axios from 'axios';
import { ArimaRequest } from '@/types/arima.';

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

export const postArima = async (payload: ArimaRequest) => {
  const response = await axios.post(`${BACKEND_URL}/ARIMA`, payload);
  return response.data;
};
