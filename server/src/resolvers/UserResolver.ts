import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware, Int} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from "../entity/User";
import {sign} from "jsonwebtoken";
import { MyContext } from "src/MyContext";
import {isAuth} from "../isAuth";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";
import { sendRefreshToken } from "../sendRefreshToken";

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

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return `your user id is: ${payload!.userId}`;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }
  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(@Arg("userId", () => Int) userId: number){
    await getConnection()
    .getRepository(User)
    .increment({ id: userId }, "tokenVersion", 1);
    return true;
  }
  @Mutation(() => LoginResponse)
  async login(@Arg("email") email: string, 
  @Arg("password") password: string,
  @Ctx() { res }: MyContext) : Promise<LoginResponse> {
    const user = await User.findOne({where: { email }});
    if(!user) {
      throw new Error("could not find user");
    }
    const valid = compare(password, user.password);
    if(!valid) {
      throw new Error("bad password");
    }
    res.cookie("jid", 
    sign({ userId: user.id }, "asasd", {expiresIn:"15d"}),
     {
       httpOnly: true
     })
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