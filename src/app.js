// import statements
import express from "express";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();
import { create } from "express-handlebars";
import { SOURCE_PATH } from "./constants.js";
//import { DefaultDeserializer } from "v8";
import { home } from "./controllers/home.js";
import bodyParser from "body-parser";
import DataSource from "./lib/DataSource.js";
import {
  getTodo,
  postTodo,
  deleteTodo,
  updateTodo,
} from "./controllers/api/todo.js";
import { getCategories } from "./controllers/api/categorie.js";

//create express app
const app = express();
//serve static file
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
app.get("/", home);

/**
 * API ROUTING
 */
app.get("/api/todo", getTodo);
app.post("/api/todo", postTodo);
app.delete("/api/todo/:id", deleteTodo);
app.put("/api/todo", updateTodo);

app.get("/api/categorie", getCategories);

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
