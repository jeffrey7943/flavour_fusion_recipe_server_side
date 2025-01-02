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

async function run() {
  try {
    //connect to the mongodb server
    await client.connect();
    //send a ping command to verify the connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "pinged your deployment. you successfully connected to mongodb!"
    );
  } finally {
    //close the client connection
    await client.close();
  }
}

//run the async function and handle errors
run().catch(console.dir);
