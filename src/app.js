// import statements
import express from "express";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();

//create express app
const app = express();

//serve static file
app.use(express.static("public"));

//define port, use 3000 if no env variable is set
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const indexHTML = path.resolve("src", "views", "index.html");
  res.sendFile(indexHTML);
});

//start the app
app.listen(port, () => {
  console.log(`server stated at port ${port}`);
});
