import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ingredient } from "./Ingredient";

@Entity()
@ObjectType()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  title!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Field((_type) => [Ingredient], { nullable: true })
  @JoinTable()
  @ManyToMany((_type) => Ingredient, (ingredient) => ingredient.recipes)
  ingredients?: Ingredient[];
}
