//import express, mongodb objectid, and database instance
const express = require("express");
const { ObjectId } = require("mongodb");
const db = require("../db/db");

//create a new express router
const router = express.Router();

//GET endpoint to fetch all users
router.get("/", async (req, res) => {
  const collection = await db.collection("users");
  const results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//GET endpoint to fetch a user by ID
router.get("/:id", async (req, res) => {
  const collection = await db.collection("users");
  const query = { _id: new ObjectId(req.params.id) };
  const result = await collection.findOne(query);

  if (!result)
    res.send("not found").status(404); //respond with 404 if not found
  else res.send(result).status(200); //respond with user data if found
});

//POST endpoint to create a new user
router.post("/create", async (req, res) => {
  try {
    const new_document = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    };
    const collection = await db.collection("users");
    const result = await collection.insertOne(new_document);
    res.send(result).status(204); //respond with 204 no content on success
  } catch (error) {
    console.error(error); //log any errors
    res.status(500).send("error adding record"); //respond with 500 internal server error on failure
  }
});

//export the router for use in other modules
module.exports = router;
