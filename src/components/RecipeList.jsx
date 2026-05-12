import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes, loading }) => {
  if (loading) {
    return <p>Cargando recetas...</p>;
  }

  if (recipes.length === 0) {
    return <p>No se encontraron recetas.</p>;
  }

  return (
    <>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </>
  );
};

export default RecipeList;