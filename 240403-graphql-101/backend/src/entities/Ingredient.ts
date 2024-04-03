import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
@ObjectType()
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  title!: string;

  @Field((_type) => [Recipe], { nullable: true })
  @ManyToMany((_type) => Recipe, (recipe) => recipe.ingredients)
  recipes?: Recipe[];
}
