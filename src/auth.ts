import { User } from "./entity/User";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User) => {
    return sign({ userId: user.id }, "asdasd", {
        expiresIn: "15d"
    });
};

export const createRefreshToken = (user: User) => {
    return sign({ userId: user.id }, "qweqwe", { 
        expiresIn: "7d" 
    });
};