import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import api from "../api/axios";

const FavouriteRecipes = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        setLoading(true);

        const response = await api.get("/favorites");

        setFavorites(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getFavorites();
  }, []);

  const handleRemoveFavorite = async (recipeId) => {
    try {
      await api.delete(`/favorites/${recipeId}`);

      setFavorites((prev) =>
        prev.filter((favorite) => favorite.recipe_id?._id !== recipeId),
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Cargando favoritos...</p>;
  }

  if (favorites.length === 0) {
    return <p>No tienes recetas favoritas.</p>;
  }

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <nav className="favourites-nav">
          <Link to="/home">Ver todas las recetas</Link>
        </nav>

        <h1>Mis recetas favoritas</h1>

        <div className="recipes-container">
          {favorites
            .filter((favorite) => favorite.recipe_id) // Filtramos solo por los favoritos que tengan recipe_id, así evitamos recetas borradas
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((favorite) => (
              <div className="recipe-card" key={favorite._id}>
                <button
                  type="button"
                  onClick={() => handleRemoveFavorite(favorite.recipe_id._id)}
                >
                  <FaHeart color="red" />
                </button>

                <img
                  src={favorite.recipe_id.image}
                  alt={favorite.recipe_id.title}
                />

                <h2>{favorite.recipe_id.title}</h2>

                <p>
                  Creador: <b>{favorite.recipe_id.user_id?.name}</b>
                </p>

                <Link to={`/recipes/${favorite.recipe_id._id}`}>
                  Ver detalle
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FavouriteRecipes;
