import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import api from "../api/axios";

const RecipeDetail = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/recipes/${id}`);

        setRecipe(response.data);
        setIsFavourite(response.data.isFavourite || false);
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

  const handleFavourite = async () => {
    try {
      if (isFavourite) {
        await api.delete(`/favorites/${recipe._id}`);
      } else {
        await api.post(`/favorites/${recipe._id}`);
      }

      setIsFavourite((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="recipe-detail-page">
      <div className="recipe-detail-container">
        <nav className="recipe-detail-nav">
          <Link to="/home">Ver todas las recetas</Link>
          <Link to="/user-dashboard">Ir a mi perfil</Link>
        </nav>

        <button type="button" onClick={handleFavourite}>
          <FaHeart color={isFavourite ? "red" : "white"} />
        </button>
        <img src={recipe.image} alt={recipe.title} />
        <h1>{recipe.title}</h1>
        <p>
          <b>Ingredientes: </b>
          {recipe.ingredients?.join(", ")}
        </p>
        <p>
          <b>Pasos: </b>
          {recipe.steps}
        </p>
        <p>
          <b>Dificultad: </b>
          {recipe.difficulty}
        </p>
        <p>
          <b>Creador: </b>
          <b>{recipe.user_id?.name}</b>
        </p>
      </div>
    </div>
  );
};

export default RecipeDetail;
