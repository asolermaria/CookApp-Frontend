import axios from "axios"; // Comunicación con el backend (HTTP) con conversión a json automática

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Importa URL de la API
  withCredentials: true, // Envío de cookies al backend
});

// Cada vez que se hace una petición, axios revisa la respuesta
// Si es 401 (Unauthorized), redirige el usuario a login
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error); // Manda el error al catch de llamada a la API
  },
);

export default api;