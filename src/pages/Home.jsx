import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

import RecipeFilters from "../components/RecipeFilters";
import RecipeList from "../components/RecipeList";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

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
    <div className="home-page">
      <div className="home-container">
        <h1>CookApp</h1>

        <nav className="home-nav">
          <Link to="/user-dashboard">Ver mi perfil</Link>
          <Link to="/favourite-recipes">Ver mis recetas favoritas</Link>
        </nav>

        <span>
          ¡Bienvenid@, <b>{user?.name}</b>!
        </span>

        <RecipeFilters
          title={title}
          setTitle={setTitle}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
        <div className="recipes-container">
          <RecipeList recipes={recipes} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Home;
