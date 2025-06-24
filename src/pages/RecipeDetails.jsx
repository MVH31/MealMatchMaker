import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams(); // Get recipe ID from URL
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
        const docRef = doc(db, "recipes", id); // Ensure the correct collection name
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

  if (loading) return <p className="text-gray-500">Loading recipe details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!recipe) return null;

  return (
    <div className="p-5 bg-white text-black min-h-screen">
      <br/>
      <br/>
      <h1 className="text-3xl font-bold text-primary mb-5">{recipe.Name}</h1>
      <img src={recipe.ImageUrl || "https://via.placeholder.com/300"} alt={recipe.name} className="w-96 object-cover rounded-md border-2 justify-center text-center m-auto" />
      <p className="text-lg">{recipe.Description}</p>
      <p className="mt-4"><strong>Time:</strong> {recipe.Time} minutes</p>
      <p className="mt-4"><strong>Ingredients:</strong> {Array.isArray(recipe.Ingredients) ? recipe.Ingredients.join(", ") : "No ingredients listed"}</p>
      <p className="mt-4"><strong>Instructions:</strong> {recipe.Instructions}</p>
    </div>
  );
};

export default RecipeDetails;