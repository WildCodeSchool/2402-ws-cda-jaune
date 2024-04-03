import { Query, Resolver } from "type-graphql";
import { Ingredient } from "../entities/Ingredient";

@Resolver()
export class IngredientResolver {
  @Query((_returns) => [Ingredient])
  ingredients(): Promise<Ingredient[]> {
    return Ingredient.find({ relations: { recipes: true } });
  }
}
