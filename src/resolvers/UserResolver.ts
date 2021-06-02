import { Resolver, Query, Mutation, Arg, ObjectType, Field} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from "../entity/User";
import {sign} from "jsonwebtoken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: String
}
@Resolver()
export class UserResolver  {
  @Query(() => String)
  hello() {
    return "hi!";
  }
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => LoginResponse)
  async login(@Arg("email") email: string, @Arg("password") password: string) : Promise<LoginResponse> {
    const user = await User.findOne({where: { email }});
    if(!user) {
      throw new Error("could not find user");
    }
    const valid = compare(password, user.password);
    if(!valid) {
      throw new Error("bad password");
    }
    return {
      accessToken: sign({ userId: user.id }, "asd", { expiresIn: "15d" })
    }
  }
  
  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
  ) {
    const hashedPassword = await hash(password, 12);
    try {
      await User.insert({
        email,
        password: hashedPassword
      });
    } catch(err) {
      console.log(err);
      return false;
    }
    return true;
  }
}