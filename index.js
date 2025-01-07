//import modules: HTTP, express, cors, dotenv, user and recipes routes
const http = require("http");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const users = require("./src/routes/user");
const recipes = require("./src/routes/recipe");

//retrieve port from environment variables
const port = process.env.PORT;

//initialize express app
const app = express();

//enable CORS for cross-origin requests
app.use(cors());
//parse incoming JSON requests
app.use(express.json());

//set up user routes with /api/users/ endpoint
app.use("/api/users", users);
//set up recipe routes with /api/recipes/ endpoint
app.use("/api/recipes", recipes);

//start server and listen on specified port
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
