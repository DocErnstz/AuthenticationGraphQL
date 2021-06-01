import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
(async () => {
    const app = express();
    app.get("/", (_req, res) => res.send("hello"));
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        })
    });
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log("express server started");
    })
})();
