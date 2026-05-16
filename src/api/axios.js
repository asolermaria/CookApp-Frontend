import axios from "axios"; // Comunicación con el backend (HTTP) con conversión a json automática

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Importa URL de la API
  withCredentials: true, // Envío de cookies al backend
});

// Axios revisa cada respuesta del backend
// Si la respuesta es 401 y el usuario no está en /login o /register, redirige el usuario a login
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const isUnauthorized = error.response?.status === 401;
    const isLoginPage = window.location.pathname === "/login";
    const isRegisterPage = window.location.pathname === "/register";

    if (isUnauthorized && !isLoginPage && !isRegisterPage) {
      window.location.href = "/login";
    }

    return Promise.reject(error); // Manda el error al catch de llamada a la API
  },
);

export default api;