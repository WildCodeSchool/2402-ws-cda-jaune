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
      if (!context.payload) return false;

      const userRoles = context.payload.roles.split(",");
      if (userRoles.includes("ADMIN")) return true;

      return !!neededRoles.filter((roleCandidate) =>
        userRoles.includes(roleCandidate)
      ).length;
    },
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      if (!process.env.JWT_SECRET) return { res };
      if (!req.headers.authorization) return { res };

      const payload = jwt.verify(
        req.headers.authorization.split("Bearer ")[1],
        process.env.JWT_SECRET
      );
      if (typeof payload === "string") return { res };
      return { payload, res };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
