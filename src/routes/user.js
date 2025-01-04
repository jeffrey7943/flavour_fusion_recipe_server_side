//import express, mongodb objectid, bcrypt, and database instance
const express = require("express");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const db = require("../db/db");

//create a new express router
const router = express.Router();
//define the number of salt rounds for bcrypt hashing
const salt_rounds = 10;
//generate a salt using the specified number of rounds
const salt = bcrypt.genSalt(salt_rounds);

//GET endpoint to fetch all users
router.get("/", async (req, res) => {
  //get the "users" collection from the database
  const collection = await db.collection("users");
  //retrieve all documents from the collection
  const results = await collection.find({}).toArray();
  //respond with the results and 200 status code
  res.send(results).status(200);
});

//GET endpoint to fetch a user by ID
router.get("/:id", async (req, res) => {
  //get the "users" collection from the database
  const collection = await db.collection("users");
  //create query to find the document by ID
  const query = { _id: new ObjectId(req.params.id) };
  //find a single document matching the query
  const result = await collection.findOne(query);

  if (!result)
    res.send("not found").status(404); //respond with 404 if not found
  else res.send(result).status(200); //respond with user data if found
});

//POST endpoint to create a new user
router.post("/create", async (req, res) => {
  const password = req.body.password;
  //hash the provided password with bcrypt
  const hashed_password = await bcrypt.hash(password, parseInt(salt));
  try {
    //create a new user document with default profile picture and admin flag
    const new_document = {
      profile_picture:
        "https://res.cloudinary.com/de74jeqj6/image/upload/v1735994287/PROFILE_PICTURE_PLACEHOLDER__1_lmsadi.webp",
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashed_password,
      admin: false, //default: not an admin
    };

    //insert the new document into the "users" collection
    const collection = await db.collection("users");
    const result = await collection.insertOne(new_document);
    res.send(result).status(204); //respond with 204 no content on success
  } catch (error) {
    console.error(error); //log any errors
    res.status(500).send("error adding record"); //respond with 500 internal server error on failure
  }
});

//DELETE endpoint to delete a user
router.delete("/:id", async (req, res) => {
  try {
    //create query to find the document by ID
    const query = { _id: new ObjectId(req.params.id) };

    //get the "users" collection from the database
    const collection = await db.collection("users");
    //delete the document matching the query
    const result = await collection.deleteOne(query);
    //send the result with a 200 status code
    res.send(result).status(200);
  } catch (error) {
    //log the error and send a 500 status response
    console.error(error);
    res.status(500).send("error deleting record");
  }
});

//export the router for use in other modules
module.exports = router;
