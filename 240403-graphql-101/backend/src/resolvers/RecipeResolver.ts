import { Query, Resolver } from "type-graphql";
import { Recipe } from "../entities/Recipe";

@Resolver()
export class RecipeResolver {
  @Query((_returns) => [Recipe])
  recipes(): Promise<Recipe[]> {
    return new Promise(() => []);
  }
}
