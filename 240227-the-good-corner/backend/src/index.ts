import express from "express";
import cors from "cors";
import "reflect-metadata";
import { dataSource } from "./data/config";
import { Category } from "./data/entities/category";
import { Like } from "typeorm";
import { Tag } from "./data/entities/tag";
import adRouter from "./routes/ads";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Woohoo, ça fonctionne !");
});

app.use("/ads", adRouter);

app.get("/categories", async (req, res) => {
  const needle = req.query.needle || "";
  const categories = await Category.find({
    where: { title: Like(`%${needle}%`) },
  });
  res.json(categories);
});

app.get("/tags", async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`API Server listening on http://localhost:${port}`);
});
