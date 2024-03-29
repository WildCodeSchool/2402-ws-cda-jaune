import { DataSource } from "typeorm";
import { Ad } from "./entities/ad";
import { Category } from "./entities/category";
import { Tag } from "./entities/tag";
require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DBNAME } = process.env;
export const dataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DBNAME,

  entities: [Ad, Category, Tag],
  synchronize: true,
});
