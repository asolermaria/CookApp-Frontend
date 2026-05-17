import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import api from "../api/axios";

const RecipeCard = ({ recipe }) => {
  const [isFavourite, setIsFavourite] = useState(recipe.isFavourite || false);

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
    <div className="recipe-card">
      <button type="button" onClick={handleFavourite}>
        <FaHeart color={isFavourite ? "red" : "white"} />
      </button>

      <img src={recipe.image} alt={recipe.title} />
      <h2>{recipe.title}</h2>
      <p>Dificutad: {recipe.difficulty}</p>
      <p>Creador: <b>{recipe.user_id?.name}</b></p>

      <Link to={`/recipes/${recipe._id}`}>Ver detalle</Link>
    </div>
  );
};

export default RecipeCard;
