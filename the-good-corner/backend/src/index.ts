import "reflect-metadata";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./config/db";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";
import UserResolver from "./resolvers/UserResolver";
import * as jwt from "jsonwebtoken";

const start = async () => {
  console.log("hot reload is working ?");
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver, UserResolver],
    authChecker: ({ context }, neededRoles) => {
      return !!neededRoles.filter((roleCandidate) =>
        context.roles.split(",").includes(roleCandidate)
      ).length;
    },
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      if (!process.env.JWT_SECRET) return {};
      if (!req.headers.authorization) return {};

      const payload = jwt.verify(
        req.headers.authorization.split("Bearer ")[1],
        process.env.JWT_SECRET
      );
      if (typeof payload === "string") return {};
      return payload;
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
