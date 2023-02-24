// import statements
import express from "express";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();
import { create } from "express-handlebars";
import { SOURCE_PATH } from "./constants.js";

//create express app
const app = express();

//serve static file
app.use(express.static("public"));

//------------ HANDLEBARS -----------//

// create an instance of express-handlebars
const hbs = create({
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(SOURCE_PATH, "views"));

//define port, use 3000 if no env variable is set
const port = process.env.PORT || 3000;

// ----------- ROUTES -------------- //
app.get("/", (req, res) => {
  res.render("home");
});

//start the app
app.listen(port, () => {
  console.log(`server stated at port ${port}`);
});
