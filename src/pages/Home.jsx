import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";

import RecipeFilters from "../components/RecipeFilters";
import RecipeList from "../components/RecipeList";

const Home = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const response = await api.get("/auth/active-user");
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getLoggedUser();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const getRecipes = async () => {
        try {
          setLoading(true);

          const response = await api.get("/recipes", {
            params: {
              title, // Recoge del useState: title
              difficulty, // Recoge del useState: difficulty
            },
          });

          setRecipes(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      getRecipes();
    }, 400);

    return () => clearTimeout(timeout);
  }, [title, difficulty]);

  return (
    <div className="recipes-page">
      <div className="recipes-container">
        <h1>CookApp</h1>

        <span>¡Bienvenid@, {user?.name}!</span>

        <nav className="home-nav">
          <Link to="/user-dashboard">Ver mi perfil</Link>
          <Link to="/favourite-recipes">Ver mis recetas favoritas</Link>
        </nav>

        <RecipeFilters
          title={title}
          setTitle={setTitle}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />

        <RecipeList recipes={recipes} loading={loading} />
      </div>
    </div>
  );
};

export default Home;
