import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} />
      <h2>{recipe.title}</h2>
      <p>{recipe.user_id?.name}</p>
      <Link to={`/recipes/${recipe._id}`}>Ver detalle</Link>
    </div>
  );
};

export default RecipeCard;