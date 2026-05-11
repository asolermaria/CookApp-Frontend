import { Link } from "react-router-dom";

const EditRecipe = () => {
  return (
    <div className="edit-recipe-page">
      <h1>EditRecipe</h1>
      <Link to="/">Cancelar edición</Link>
    </div>
  );
};

export default EditRecipe;
