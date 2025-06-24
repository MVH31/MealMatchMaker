import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/recipes" element = {<Recipes />} />
          <Route path = "/recipes/:id" element = {<RecipeDetails />} />
          <Route path = "/addrecipe" element = {<AddRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;