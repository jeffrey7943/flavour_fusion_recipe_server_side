//importing http module and dotenv for environment variables
const http = require("http");
require("dotenv").config();

//retrieving hostname and port from environment variables
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

//creating and configuring the HTTP server
const server = http.createServer((req, res) => {
  res.statusCode = 200; //set HTTP status to 200 (OK)
  res.setHeader("content-type", "text/html"); //set the response content type to HTML
  res.end("HELLO, WORLD!\n"); //send response message
});

//starting the server on the specified hostname and port
server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}/`);
});
