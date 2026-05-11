import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await api.get(
          `/recipes?title=${title}&difficulty=${difficulty}`,
        );
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getRecipes();
  }, [title, difficulty]);

  return (
    <div className="recipes-page">
      <div className="recipes-container">
        <h1>CookApp</h1>

        <span>¡Bienvenid@, !</span>

        <nav className="home-nav">
          <Link to="/">Ver mi perfil</Link>
          <Link to="/favourite-recipes">Ver mis recetas favoritas</Link>
        </nav>

        <div className="recipes-filters">
          <input
            type="text"
            name="title"
            placeholder="Introduce el nombre de una receta..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Todas las dificultades</option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <img src={recipe.image} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <p>{recipe.user_id?.name}</p>
            <Link to={`/recipes/${recipe._id}`}>Ver detalle</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;