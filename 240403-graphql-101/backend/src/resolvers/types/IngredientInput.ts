import { Field, InputType } from "type-graphql";
import { Ingredient } from "../../entities/Ingredient";

@InputType()
export class IngredientInput implements Partial<Ingredient> {
  @Field()
  title!: string;
}
