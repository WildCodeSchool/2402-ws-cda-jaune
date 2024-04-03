import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./data/db.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: false,
  migrations: ["data/*.ts"],
  migrationsTableName: "migrations",
});
