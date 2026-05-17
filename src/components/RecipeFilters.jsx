const RecipeFilters = ({ title, setTitle, difficulty, setDifficulty }) => {
  return (
    <div className="home-filters">
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
  );
};

export default RecipeFilters;