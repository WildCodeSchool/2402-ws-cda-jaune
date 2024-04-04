import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Ingredient } from "../entities/Ingredient";
import { IngredientInput } from "./types/IngredientInput";

@Resolver(Ingredient)
export class IngredientResolver {
  @Query((_returns) => [Ingredient])
  ingredients(): Promise<Ingredient[]> {
    return Ingredient.find({ relations: { recipes: true } });
  }

  @Mutation((_returns) => Ingredient)
  addIngredient(
    @Arg("ingredient") ingredientInput: IngredientInput
  ): Promise<Ingredient> {
    const ingredient = Ingredient.create();
    ingredient.title = ingredientInput.title;
    return ingredient.save();
  }
}
