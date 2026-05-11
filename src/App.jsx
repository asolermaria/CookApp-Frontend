import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeDetail from "./pages/RecipeDetail";
import FavouriteRecipes from "./pages/FavouriteRecipes";
import UserDashboard from "./pages/UserDashboard";
import CreateRecipe from "./pages/CreateRecipe"
import EditRecipe from "./pages/EditRecipe"

function App() {
  return (
    <BrowserRouter> {/* Controla las URLs del navegador sin recargar la página */}
      <Routes> {/* Agrupa las rutas */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/recipes/:id" element={<RecipeDetail />} />

        <Route path="/favourite-recipes" element={<FavouriteRecipes />} />

        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/edit-recipe" element={<EditRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;