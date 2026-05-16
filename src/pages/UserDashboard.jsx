import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const UserDashboard = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const getMyRecipes = async () => {
      try {
        setLoading(true);
        const response = await api.get("/recipes/myrecipes");
        setMyRecipes(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMyRecipes();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null); // Limpiamos el contexto al cerrar sesión
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (recipeId) => {
    try {
      const isConfirmed = confirm(
        "¿Estás segur@ que quieres eliminar esta receta?",
      );
      if (!isConfirmed) return;

      await api.delete(`/recipes/${recipeId}`);
      setMyRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-dashboard-page">
      <div className="user-dashboard-container">
        <h1>Mi perfil</h1>

        <Link to="/home">Ver todas las recetas</Link>

        <div className="user-dashboard-msg-bienvenida">
          <span>
            ¡Bienvenid@, <b>{user?.name}</b>!
          </span>
          <span>¿Qué quieres hacer hoy?</span>
        </div>

        <div className="user-dashboard-options">
          <Link to="/create-recipe">Crear una nueva receta</Link>
          <button type="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>

        <span>Recetas creadas por mi</span>

        {loading && <p>Cargando tus recetas...</p>}

        {!loading && myRecipes.length === 0 && (
          <p>Todavía no has creado recetas.</p>
        )}

        <div className="recipes-container">
          {!loading &&
            myRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe._id}>
                <img src={recipe.image} alt={recipe.title} />
                <h2>{recipe.title}</h2>

                <Link to={`/recipes/${recipe._id}`}>Ver detalle</Link>
                <Link to={`/edit-recipe/${recipe._id}`}>Editar receta</Link>
                <button className="delete-button" type="button" onClick={() => handleDelete(recipe._id)}>
                  Eliminar receta
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
