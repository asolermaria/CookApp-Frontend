import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData, // Mantiene los valores anteriores del formulario
      [e.target.name]: e.target.value, // Actualiza el campo correspondiente con el nuevo valor
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", formData);
      setUser(response.data.user);
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Iniciar sesión</h1>

        <span>¡Bienvenid@ a CookApp!</span>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Entrar</button>
        </form>

        {error && <p>{error}</p>}

        <div className="login-footer">
          <p>¿Aún no tienes cuenta con nosotros?</p>
          <Link to="/register">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
