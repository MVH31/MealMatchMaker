import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const AddRecipe = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    recipe_name: "",
    prep_time: "",
    cook_time: "",
    total_time: "",
    servings: "",
    yield: "",
    ingredients: "",
    directions: "",
    img_src: "",
    cuisine_path: "",
    nutrition: "",
    rating: "",
    url: "",
  });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.recipe_name || !formData.ingredients || !formData.directions) {
      alert("Please fill in Recipe Name, Ingredients, and Directions.");
      return;
    }

    setUploading(true);

    try {
      await addDoc(collection(db, "recipes"), {
        recipe_name: formData.recipe_name,
        prep_time: formData.prep_time || null,
        cook_time: formData.cook_time || null,
        total_time: formData.total_time || null,
        servings: formData.servings ? parseInt(formData.servings) : null,
        yield: formData.yield || null,
        ingredients: formData.ingredients,
        directions: formData.directions,
        img_src: formData.img_src || "https://via.placeholder.com/300",
        cuisine_path: formData.cuisine_path || null,
        nutrition: formData.nutrition || null,
        rating: formData.rating ? parseFloat(formData.rating) : null,
        url: formData.url || null,
        userId: user.uid,
        createdAt: new Date(),
      });

      alert("Recipe added successfully!");
      setFormData({
        recipe_name: "",
        prep_time: "",
        cook_time: "",
        total_time: "",
        servings: "",
        yield: "",
        ingredients: "",
        directions: "",
        img_src: "",
        cuisine_path: "",
        nutrition: "",
        rating: "",
        url: "",
      });
      navigate("/recipes");
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Error adding recipe. Please try again.");
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Add New Recipe</h1>
        
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          {/* Recipe Name */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Recipe Name *</label>
            <input
              type="text"
              name="recipe_name"
              placeholder="e.g., Apple Pie"
              value={formData.recipe_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none"
              required
            />
          </div>

          {/* Image URL */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
            <input
              type="url"
              name="img_src"
              placeholder="https://example.com/image.jpg"
              value={formData.img_src}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none"
            />
          </div>

          {/* Timing Information */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Prep Time</label>
              <input
                type="text"
                name="prep_time"
                placeholder="e.g., 20 mins"
                value={formData.prep_time}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Cook Time</label>
              <input
                type="text"
                name="cook_time"
                placeholder="e.g., 45 mins"
                value={formData.cook_time}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Total Time</label>
              <input
                type="text"
                name="total_time"
                placeholder="e.g., 1 hrs"
                value={formData.total_time}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Servings</label>
              <input
                type="number"
                name="servings"
                placeholder="e.g., 8"
                value={formData.servings}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Yield & Rating */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Yield</label>
              <input
                type="text"
                name="yield"
                placeholder="e.g., 1 9-inch pie"
                value={formData.yield}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Rating</label>
              <input
                type="number"
                name="rating"
                placeholder="e.g., 4.5"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Cuisine Path</label>
              <input
                type="text"
                name="cuisine_path"
                placeholder="e.g., /Desserts/Pies/"
                value={formData.cuisine_path}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Recipe URL */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Recipe Source URL</label>
            <input
              type="url"
              name="url"
              placeholder="https://example.com/recipe"
              value={formData.url}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none"
            />
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Ingredients *</label>
            <textarea
              name="ingredients"
              placeholder="Enter ingredients (comma separated or line by line)"
              value={formData.ingredients}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none"
              required
            />
          </div>

          {/* Directions */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Directions *</label>
            <textarea
              name="directions"
              placeholder="Enter cooking directions step by step"
              value={formData.directions}
              onChange={handleChange}
              rows="8"
              className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none"
              required
            />
          </div>

          {/* Nutrition */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Nutrition Information</label>
            <textarea
              name="nutrition"
              placeholder="e.g., Total Fat 18g 23%, Saturated Fat 7g 34%..."
              value={formData.nutrition}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-600 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
            >
              {uploading ? "Adding Recipe..." : "Add Recipe"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/recipes")}
              className="flex-1 bg-gray-400 text-white font-bold py-3 rounded-lg hover:bg-gray-500 transition duration-300"
            >
              Cancel
            </button>
          </div>

          {/* Required Fields Note */}
          <p className="text-sm text-gray-600 mt-4">* Required fields</p>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;