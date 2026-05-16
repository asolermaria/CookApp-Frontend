import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/axios";

const CreateRecipe = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    ingredients: "",
    steps: "",
    difficulty: "Baja",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev, // Mantiene los valores anteriores del formulario
      [e.target.name]: e.target.value, // Actualiza el campo correspondiente con el nuevo valor
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/recipes", {
        ...formData,

        // Convertimos ingredientes de String a Array
        ingredients: formData.ingredients
          .split(",") // Separa elementos del array por comas
          .map((ingredient) => ingredient.trim()) // Limpia espacios al principio y al final de cada ingrediente
          .filter((ingredient) => ingredient !== ""), // Evita guardar ingredientes vacíos si el usuario añade comas extra
      });

      alert("Receta creada");
      navigate("/user-dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-recipe-page">
      <div className="create-recipe-container">
        <h1>Crear receta</h1>

        <Link to="/user-dashboard">Volver a mi perfil</Link>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="image"
            placeholder="URL imagen"
            value={formData.image}
            onChange={handleChange}
          />

          <textarea
            name="ingredients"
            placeholder="Ingredientes separados por comas"
            value={formData.ingredients}
            onChange={handleChange}
          />

          <textarea
            name="steps"
            placeholder="Pasos"
            value={formData.steps}
            onChange={handleChange}
          />

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>

          <button type="submit">
            Crear receta
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;