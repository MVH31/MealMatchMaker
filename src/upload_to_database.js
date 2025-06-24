import admin from "firebase-admin";
import { readFileSync } from "fs";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(readFileSync("./serviceKey.json", "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

const recipes = JSON.parse(readFileSync("dataset2.json", "utf-8"));

async function uploadRecipes() {
  const batch = db.batch();
  const collectionRef = db.collection("recipes");

  recipes.forEach((recipient) => {
    const docRef = collectionRef.doc();

    const formattedRecipe = {
      Name: recipient.recipe || "Unnamed Recipe",
      Ingredients: recipient.ingredients ? recipient.ingredients.split(", ") : [],
      Time: recipient.time || "Unknown",
      Instructions: recipient.instructions || "No instructions provided.",
      ImageUrl: recipient.img || "https://example.com/default.jpg",
    };

    batch.set(docRef, formattedRecipe);
    console.log(`${recipient.recipe}`)
  });

  await batch.commit();
  console.log("Recipes successfully uploaded to Firebase!");
}

uploadRecipes().catch(console.error);