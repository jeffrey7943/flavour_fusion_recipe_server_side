//import necessary mongodb modules
const { MongoClient, ServerApiVersion } = require("mongodb");

//get the mongodb connection URI from environment variables
const uri = process.env.URI;

//create a mongodb client with server API options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, //use API version 1
    strict: true, //enable strict mode
    deprecationErrors: true, //flag deprecated operations
  },
});

//async function to establish a connection to mongodb
async function run() {
  try {
    //connect to the mongodb client
    await client.connect();
    //send a ping command to verify the connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "pinged your deployment. you successfully connected to mongodb!"
    );
  } catch (error) {
    //log any connection error
    console.error(error);
  }
}

//call the function to initiate the connection
run();
//access the flavour_fusion_recipe database
const db = client.db("flavour_fusion_recipe");

//export the database object for use in other modules
module.exports = db;
