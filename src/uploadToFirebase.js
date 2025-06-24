import { db } from "./firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";
import fs from "fs";
const recipes = JSON.parse(fs.readFileSync("dataset2.json", "utf-8"));

const uploadRecipes = async() => {
    try {
        const recipeRef = collection(db, "recipes");
        for(const recipe of recipes) {
            await addDoc(recipeRef,  {
                Name: recipe.name,
                Ingredients: recipe.ingredients.split(","),
                Time: recipe.time,
                Instructions: recipe.instructions,
                Image: recipe.img
            });

            console.log(`Uploaded: ${recipe.name}`);
        }

        console.log("All recipes uploaded!");
    } catch(error) {
        console.error("Error uploading recipes", error);
    }
};

uploadRecipes();