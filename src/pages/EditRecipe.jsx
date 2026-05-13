import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import api from "../api/axios";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    ingredients: "",
    steps: "",
    difficulty: "",
  });

  useEffect(() => {
    const getRecipe = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/recipes/${id}`);

        setFormData({
          title: response.data.title,
          image: response.data.image,
          ingredients: response.data.ingredients.join(", "),
          steps: response.data.steps,
          difficulty: response.data.difficulty,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRecipe();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev, // Mantiene los valores anteriores del formulario
      [e.target.name]: e.target.value, // Actualiza el campo correspondiente con el nuevo valor
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/recipes/${id}`, {
        ...formData,

        // Convertimos ingredientes de String a Array
        ingredients: formData.ingredients
          .split(",") // Separa elementos del array por comas
          .map((ingredient) => ingredient.trim()), // Limpia espacios al principio y al final de cada ingrediente
      });

      alert("Receta modificada");
      navigate("/user-dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Cargando receta...</p>;
  }

  return (
    <div className="edit-recipe-page">
      <div className="edit-recipe-container">
        <h1>Editar receta</h1>

        <Link to="/user-dashboard">Cancelar edición</Link>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />

          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
          />

          <textarea
            name="steps"
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

          <button type="submit">Guardar cambios</button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
