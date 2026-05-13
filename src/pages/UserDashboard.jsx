import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/axios";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const response = await api.get("/auth/active-user");
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

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

    getLoggedUser();
    getMyRecipes();
  }, []);

  console.log(myRecipes);
  

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (recipeId) => {
    try {
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

        <span>¡Bienvenid@, {user?.name}!</span>
        <span>¿Qué quieres hacer hoy?</span>

        <Link to="/create-recipe">Crear una nueva receta</Link>
        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>

        <span>Recetas creadas por mi</span>

        {loading && <p>Cargando tus recetas...</p>}

        {!loading && myRecipes.length === 0 && (
          <p>Todavía no has creado recetas.</p>
        )}

        {myRecipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            
            <img src={recipe.image} alt={recipe.title} />
            <h2>{recipe.title}</h2>

            <Link to={`/recipes/${recipe._id}`}>Ver detalle</Link>
            <Link to={`/edit-recipe/${recipe._id}`}>Editar receta</Link>
            <button type="button" onClick={() => handleDelete(recipe._id)}>
              Eliminar receta
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
