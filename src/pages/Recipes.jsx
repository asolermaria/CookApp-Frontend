import { useEffect, useState } from "react";
import api from "../api/axios";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await api.get("/recipes");
        console.log("Respuesta backend:", response.data);
        setRecipes(response.data);
      } catch (error) {
        console.log("Error conectando con backend:", error);
      }
    };

    testConnection();
  }, []);

  return (
    <div>
      <h1>Recetas</h1>

      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <h2>{recipe.title}</h2>
          <p>{recipe.difficulty}</p>
        </div>
      ))}
    </div>
  );
};

export default Recipes;