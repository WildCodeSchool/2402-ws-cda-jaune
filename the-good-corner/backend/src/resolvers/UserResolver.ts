import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { User } from "../entities/user";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

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
  async login(@Arg("data") userData: NewUserInput, @Ctx() context: any) {
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
      context.res.setHeader("Set-Cookie", `token=${token}`);
      return JSON.stringify({
        mail: user.mail,
        id: user.id,
        roles: user.roles,
      });
    } catch (err) {
      return err;
    }
  }

  @Mutation(() => String)
  async signup(@Arg("data") userData: NewUserInput, @Ctx() context: any) {
    if (!process.env.JWT_SECRET) throw new Error();

    const hashedPassword = await argon2.hash(userData.password);
    const user = await User.save({
      mail: userData.mail,
      hashedPassword,
      roles: "USER",
    });
    const token = jwt.sign(
      {
        mail: user.mail,
        id: user.id,
        roles: user.roles,
      },
      process.env.JWT_SECRET
    );
    context.res.setHeader("Set-Cookie", `token=${token}`);
    return JSON.stringify({
      mail: user.mail,
      id: user.id,
      roles: user.roles,
    });
  }
}

export default UserResolver;
