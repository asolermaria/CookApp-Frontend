import { Link } from "react-router-dom";

const CreateRecipe = () => {
  return (
    <div className="create-recipe-page">
      <h1>CreateRecipe</h1>
      <Link to="/user-dashboard">Volver a mi perfil</Link>
    </div>
  );
};

export default CreateRecipe;
