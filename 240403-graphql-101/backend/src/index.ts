import express from "express";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from "./resolvers/RecipeResolver";

const port = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startApollo = async () => {
  const schema = await buildSchema({
    resolvers: [RecipeResolver],
  });
  const apolloServer = new ApolloServer();
};
startApollo();

app.listen(port, async () => {
  console.log(`project's backend listening on http://localhost:${port}`);
});
