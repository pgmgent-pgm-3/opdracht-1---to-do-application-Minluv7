// import statements
import express from "express";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();
import { create } from "express-handlebars";
import { SOURCE_PATH } from "./constants.js";
import { DefaultDeserializer } from "v8";
import { categoryTodos, home } from "./controllers/home.js";
import bodyParser from "body-parser";
import DataSource from "./lib/DataSource.js";
import {
  getTodo,
  postTodo,
  deleteTodo,
  updateTodo,
} from "./controllers/api/todo.js";

import {
  getTodo as getHomeTodo,
  postTodo as postHomeTodo,
  deleteTodo as deleteHomeTodo,
  updateTodo as updateHomeTodo,
} from './controllers/todo.js';

import {
  getCategories,
  postCategories,
  deleteCategories,
  updateCategories,
} from "./controllers/api/categorie.js";

import {
  getCategories as getHomeCategory,
  postCategories as postHomeCategory,
  deleteCategories as deleteHomeCategory,
  updateCategories as updateHomeCategory,
} from "./controllers/category.js"

import { getUsers } from "./controllers/api/user.js";

import {
  getUsers as getHomeUsers
} from "./controllers/user.js"

import {
  login,
  register,
  logout,
  postRegister,
  postLogin,
} from "./controllers/authentication.js";
import registerAuthentication from "./middleware/validation/registerAuthentication.js";
import loginAuthentication from "./middleware/validation/loginAuthentication.js";
import { jwtAuth } from "./middleware/jwtAuth.js";
import cookieParser from "cookie-parser";

//create express app
const app = express();
//serve static file
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Tell express to use the cookie parser

app.use(cookieParser());

//------------ HANDLEBARS -----------//

// create an instance of express-handlebars
const hbs = create({
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(SOURCE_PATH, "views"));

//define port, use 3000 if no env variable is set
//const port = process.env.PORT || 3000;

// ----------- ROUTES -------------- //
app.get("/", jwtAuth, home, );

app.post('/todo', jwtAuth, postHomeTodo, home);
app.get("/todo", jwtAuth, getHomeTodo, home);
app.post("/todo/delete/:id", jwtAuth, deleteHomeTodo)
app.post("/todo/update/:id", jwtAuth, updateHomeTodo);

app.get("/category/:id", jwtAuth, categoryTodos, home);
app.get("/category", jwtAuth, getHomeCategory, home);
app.post("/category", jwtAuth, postHomeCategory, home);
app.post("/category/delete/:id", jwtAuth, deleteHomeCategory);
app.put("/category", jwtAuth, updateHomeCategory);

app.get("/user", getHomeUsers);


// app.get("/category", postCategory);

app.get("/login", login);
app.get("/register", register);
app.post("/logout", logout);
app.post("/login", loginAuthentication, postLogin, login);
app.post("/register", registerAuthentication, postRegister, register);
/**
 * API ROUTING
 */

app.get("/api/todo", getTodo);
app.post("/api/todo", postTodo);
app.delete("/api/todo/:id", deleteTodo);
app.put("/api/todo", updateTodo);

app.get("/api/categorie", getCategories);
app.post("/api/categorie", postCategories);
app.delete("/api/categorie/:id", deleteCategories);
app.put("/api/categorie", updateCategories);

app.get("/api/user", getUsers);

// start the server
DataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Application is running on http://localhost:${process.env.PORT}/.`
      );
    });
  })
  .catch(function (error) {
    console.log("Error: ", error);
  });
