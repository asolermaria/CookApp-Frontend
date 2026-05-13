import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../api/axios";

const RecipeDetail = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/recipes/${id}`);

        setRecipe(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getRecipe();
  }, [id]);

  if (loading) {
    return <p>Cargando receta...</p>;
  }

  if (!recipe) {
    return <p>Receta no encontrada.</p>;
  }

  return (
    <div className="recipe-detail-page">
      <Link to="/home">Ver todas las recetas</Link>
      <Link to="/user-dashboard">Ir a mi perfil</Link>

      {loading && <p>Cargando receta...</p>}

      <img src={recipe.image} alt={recipe.title} />
      <h1>{recipe.title}</h1>
      <p>Ingredientes: {recipe.ingredients?.join(", ")}</p>
      <p>Pasos: {recipe.steps}</p>
      <p>Dificultad: {recipe.difficulty}</p>
      <p>Creador: {recipe.user_id?.name}</p>
    </div>
  );
};

export default RecipeDetail;
