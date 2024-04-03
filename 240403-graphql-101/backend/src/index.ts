import express from "express";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from "./resolvers/RecipeResolver";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { dataSource } from "./dataSource";

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
    resolvers: [RecipeResolver],
  });
  const apolloServer = new ApolloServer<MyContext>({ schema });
  await apolloServer.start();

  app.use("/graphql", express.json(), expressMiddleware(apolloServer));
};
startApollo();

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`project's backend listening on http://localhost:${port}`);
});
