import { dataSource } from "../dataSource";
import { Ingredient } from "../entities/Ingredient";
import { Recipe } from "../entities/Recipe";

// Data
const recipesData = [
  {
    title: "full recipe",
    description: "with a description",
  },
  {
    title: "minimal recipe",
  },
];
const ingredientsData = [
  {
    title: "my first ingredient",
  },
];

// Function
async function loadFixtures() {
  try {
    await dataSource.initialize();

    const savedRecipes = await Promise.all(
      recipesData.map((recipeData) => {
        const recipe = new Recipe();
        recipe.title = recipeData.title;
        recipe.description = recipeData.description;
        return recipe.save();
      })
    );
    console.log("Recettes enregistrées: ", savedRecipes.length);

    const savedIngredients = await Promise.all(
      ingredientsData.map(async (ingredientData) => {
        const ingredient = new Ingredient();
        ingredient.title = ingredientData.title;
        ingredient.recipes = [savedRecipes[0]];
        return await ingredient.save();
      })
    );
    console.log("Ingredients enregistrés: ", savedIngredients.length);
  } catch (err) {
    console.error("Erreur lors de l'enregistrement: ", err);
  } finally {
    // Close dataSource
  }
}
loadFixtures();
