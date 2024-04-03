import { DataSource } from "typeorm";
require("dotenv").config();

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./data/db.sqlite",
  entities: ["src/data/entities/*.ts"],
  synchronize: false,
  migrations: ["data/*.ts"],
  migrationsTableName: "migrations",
});
