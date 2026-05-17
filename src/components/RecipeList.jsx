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
      {recipes
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
    </>
  );
};

export default RecipeList;
