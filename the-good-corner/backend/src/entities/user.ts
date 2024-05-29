import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Ad } from "./ad";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  mail: string;

  @Field()
  @Column()
  hashedPassword: string;

  @Field(() => [Ad])
  @OneToMany(() => Ad, (ad) => ad.owner)
  ads: Ad[];

  @Field()
  @Column()
  roles: string; // "USER", "ADMIN", "USER,MODERATOR"
}

export type Context = {
  res: any;
  payload?: {
    mail: string;
    id: number;
    roles: string;
  };
};
