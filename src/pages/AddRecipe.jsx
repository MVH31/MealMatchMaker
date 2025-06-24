import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const AddRecipe = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login"); // Redirect if not logged in
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !ingredients || !instructions) {
      alert("Please fill in all fields.");
      return;
    }

    setUploading(true);

    try {
      await addDoc(collection(db, "recipes"), {
        name,
        description,
        ingredients: ingredients.split(","), // Convert comma-separated string to array
        instructions,
        userId: user.uid, // Save user ID
        createdAt: new Date(),
      });

      alert("Recipe added successfully!");
      setUploading(false);
      navigate("/recipes");
    } catch (error) {
      console.error("Error adding recipe:", error);
      setUploading(false);
    }
  };

  return (
    <div className="bg-darkBg text-textLight min-h-screen p-3 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-darkCard p-6 rounded-lg shadow-lg"
      >
        <input
          type="text"
          placeholder="Recipe Name"
          className="w-full p-2 mb-4 bg-darkInput text-white rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 mb-4 bg-darkInput text-white rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingredients (comma separated)"
          className="w-full p-2 mb-4 bg-darkInput text-white rounded"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <textarea
          placeholder="Instructions"
          className="w-full p-2 mb-4 bg-darkInput text-white rounded"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primaryHover"
          disabled={uploading}
        >
          {uploading ? "Adding..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;