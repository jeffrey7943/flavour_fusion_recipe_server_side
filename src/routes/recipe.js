//import express, mongodb objectid, and database instance
const express = require("express");
const { ObjectId } = require("mongodb");
const db = require("../db/db");

//create a new express router
const router = express.Router();

router.get("/", async (req, res) => {
  //get the "recipes" collection from the database
  const collection = await db.collection("recipes");
  //retrieve all documents from the collection
  const results = await collection.find({}).toArray();
  //respond with the results and 200 status code
  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  //get the "recipes" collection from the database
  const collection = await db.collection("recipes");
  //create query to find the document by ID
  const query = { _id: new ObjectId(req.params.id) };
  //find a single document matching the query
  const result = await collection.findOne(query);

  if (!result)
    res.send("not found").status(404); //respond with 404 if not found
  else res.send(result).status(200); //respond with user data if found
});
