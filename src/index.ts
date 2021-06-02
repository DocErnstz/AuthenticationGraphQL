import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import "dotenv/config";
import express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { createConnection } from "typeorm";


(async () => {
    const app = express();
    app.get("/", (_req, res) => res.send("hello"));
    console.log(process.env.ACCESS_TOKEN_SECRET)
    await createConnection();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log("express server started");
    })
})();
