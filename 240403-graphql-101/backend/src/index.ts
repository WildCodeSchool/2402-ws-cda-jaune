import express from "express";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from "./resolvers/RecipeResolver";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { dataSource } from "./dataSource";
import { IngredientResolver } from "./resolvers/IngredientResolver";

const port = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startApollo = async () => {
  interface MyContext {
    token?: string;
  }
  const schema = await buildSchema({
    resolvers: [RecipeResolver, IngredientResolver],
  });
  const apolloServer = new ApolloServer<MyContext>({ schema });
  await apolloServer.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer)
  );
};
startApollo();

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`project's backend listening on http://localhost:${port}`);
});
