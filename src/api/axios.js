import axios from "axios"; // Comunicación con el backend (HTTP) con conversión a json automática

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Importa URL de la API
  withCredentials: true, // Envío de cookies al backend
});

export default api;