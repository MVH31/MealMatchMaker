import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";

const Navbar = lazy(() => import("./components/Navbar"));
const Home = lazy(() => import("./pages/Home"));
const Recipes = lazy(() => import("./pages/Recipes"));
const RecipeDetails = lazy(() => import("./pages/RecipeDetails"));
const AddRecipe = lazy(() => import("./pages/AddRecipe"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="flex flex-col items-center gap-4">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600" />
      <p className="text-gray-600 font-semibold">Loading page...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/addrecipe" element={<AddRecipe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;