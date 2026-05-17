import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeDetail from "./pages/RecipeDetail";
import FavouriteRecipes from "./pages/FavouriteRecipes";
import UserDashboard from "./pages/UserDashboard";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";

import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/favourite-recipes" element={<FavouriteRecipes />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
