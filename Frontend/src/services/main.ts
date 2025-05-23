import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND_URL as string;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api