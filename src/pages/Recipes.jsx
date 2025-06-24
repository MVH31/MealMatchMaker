import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipeCollection = collection(db, "recipes");
        const recipeSnapshot = await getDocs(recipeCollection);
        const recipeList = recipeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(recipeList);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Recipe List</h2>
      <div className="grid grid-cols-4 gap-4 w-full">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 m-1.5"
          >
            <img
              src={recipe.ImageUrl || "https://via.placeholder.com/300"}
              alt={recipe.name}
              className="w-48 h-48 object-cover rounded-md m-auto"
            />
            <h3 className="font-semibold mb-2">{recipe.Name}</h3>
            <div className="mt-4 items-center text-center">
              <Link
                to={`/recipes/${recipe.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                View Recipe
              </Link>
              { /*<button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700 transition duration-300">
                Edit
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-300">
                Delete
              </button> */ }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;