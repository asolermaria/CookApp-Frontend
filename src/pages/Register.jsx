import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      const response = await api.post("/auth/register", formData);

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Registro</h1>

        <span>¡Bienvenid@ a CookApp!</span>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
          />

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

          <button type="submit">Registrarse</button>
        </form>

        {error && <p>{error}</p>}
        {error === "Email ya registrado" && (
          <Link to="/login">¿Quieres iniciar sesión?</Link>
        )}

        <div className="register-footer">
          <p>¿Ya tienes cuenta con nosotros?</p>
          <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
