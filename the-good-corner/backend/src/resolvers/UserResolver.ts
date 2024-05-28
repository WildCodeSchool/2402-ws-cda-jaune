import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { User } from "../entities/user";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

dotenv.config();

@InputType()
class NewUserInput implements Partial<User> {
  @Field()
  mail: string;

  @Field()
  password: string;
}

@Resolver(User)
class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    return await User.find();
  }

  @Mutation(() => String)
  async login(@Arg("data") userData: NewUserInput) {
    try {
      if (!process.env.JWT_SECRET) throw new Error();
      const user = await User.findOneByOrFail({ mail: userData.mail });
      const isValid = await argon2.verify(
        user.hashedPassword,
        userData.password
      );
      if (!isValid) throw new Error();

      const token = jwt.sign(
        {
          mail: user.mail,
          id: user.id,
          roles: user.roles,
        },
        process.env.JWT_SECRET
      );
      return token;
    } catch (err) {
      return err;
    }
  }

  @Mutation(() => String)
  async signup(@Arg("data") userData: NewUserInput) {
    const hashedPassword = await argon2.hash(userData.password);
    await User.save({
      mail: userData.mail,
      hashedPassword,
      roles: "USER",
    });
    return "I was here!";
  }
}

export default UserResolver;
