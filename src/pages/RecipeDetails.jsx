import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setError("No recipe ID provided.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRecipe(docSnap.data());
        } else {
          setError("Recipe not found.");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 py-12">Loading recipe details...</p>;
  if (error) return <p className="text-center text-red-500 py-12">{error}</p>;
  if (!recipe) return null;

  const recipeName = recipe.recipe_name || recipe.Name;
  const imageUrl = recipe.img_src || recipe.ImageUrl || "https://via.placeholder.com/400";
  const ingredients = recipe.ingredients || recipe.Ingredients || "";
  const directions = recipe.directions || recipe.Instructions || "";
  const rating = recipe.rating;
  const nutrition = recipe.nutrition;
  const url = recipe.url;
  const cuisinePath = recipe.cuisine_path;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/recipes")}
          className="mb-6 flex items-center text-orange-600 hover:text-orange-800 font-semibold transition duration-300"
        >
          <span className="mr-2">←</span> Back to Recipes
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <img
            src={imageUrl}
            alt={recipeName}
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipeName}</h1>
            
            {/* Rating */}
            {rating && (
              <div className="flex items-center mb-4">
                <span className="text-3xl text-yellow-500">★</span>
                <span className="ml-2 text-2xl font-semibold text-gray-700">{rating}/5</span>
              </div>
            )}

          </div>
        </div>

        {/* Cooking Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {recipe.prep_time && (
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm font-semibold">Prep Time</p>
              <p className="text-xl font-bold text-orange-600">{recipe.prep_time}</p>
            </div>
          )}
          {recipe.cook_time && (
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm font-semibold">Cook Time</p>
              <p className="text-xl font-bold text-orange-600">{recipe.cook_time}</p>
            </div>
          )}
          {recipe.total_time && (
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm font-semibold">Total Time</p>
              <p className="text-xl font-bold text-orange-600">{recipe.total_time}</p>
            </div>
          )}
          {recipe.servings && (
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm font-semibold">Servings</p>
              <p className="text-xl font-bold text-orange-600">{recipe.servings}</p>
            </div>
          )}
        </div>

        {/* Yield */}
        {recipe.yield && (
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <p className="text-gray-600 font-semibold">Yield</p>
            <p className="text-lg text-gray-800">{recipe.yield}</p>
          </div>
        )}

        {/* Ingredients */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {ingredients}
          </div>
        </div>

        {/* Directions */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Directions</h2>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {directions}
          </div>
        </div>

        {/* Nutrition */}
        {nutrition && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Nutrition</h2>
            <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {nutrition}
            </div>
          </div>
        )}

        {/* Source Link */}
        {url && (
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <p className="text-gray-700 mb-2">View original recipe on:</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-semibold underline break-all"
            >
              {url}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;