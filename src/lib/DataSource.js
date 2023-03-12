import { DataSource } from "typeorm";

// import van todo en categorie

import Categorie from "../models/Categorie.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

const entities = [Categorie, Todo, User];

import * as dotenv from "dotenv";
dotenv.config();
// steek die in een array

const DS = new DataSource({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: entities, // vertelt aan de datasource welke entities hij moet gebruiken
});

export default DS;
