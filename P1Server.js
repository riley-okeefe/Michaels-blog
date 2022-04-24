const express = require("express");
const server = express();
let mongodb = require("mongodb").MongoClient;

// credential string elements
let head = "mongodb://";
let user = "r_okeefe";
let password = "healthJUMPaugust03";
let localHost = "127.0.0.1";
let localPort = "27017";
let database = "r_okeefe";
let connectionString =
  head + user + ":" + password + "@" + localHost + ":" + localPort + "/" + user;
let globalDB;
const port = 3172;
let blogs = ["", "", ""];

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

server.use(allowCrossDomain);

// upon receiving a post at this url save value ot blog
// authors: ALi Alhusseini, Riley Okeefe
server.post("/blog1", function (req, res) {
  blogs[0] = req.body.text;
  console.log("id: 1, text: " + req.body.text);
  let obj = { text: blogs[0] };
  return res.status(201).send(obj);
});

// upon receiving a post at this url execute callback function and save value ot blog
// authors: ALi Alhusseini, Riley Okeefe
server.post("/blog2", function (req, res) {
  blogs[1] = req.body.text;
  console.log("id: 2, text: " + req.body.text);
  let obj = { text: blogs[1] };
  return res.status(201).send(obj);
});

// upon receiving a post at this url execute callback function and save value ot blog
// authors: ALi Alhusseini, Riley Okeefe 
server.post("/blog3", function (req, res) {
  blogs[2] = req.body.text;
  console.log("id: 3, text: " + req.body.text);
  let obj = { text: blogs[2] };
  return res.status(201).send(obj);
});

// Deleting the blog from the server
// authors: ALi Alhusseini, Riley Okeefe
server.delete("/blog1", (req, res) => {
  blogs[0] = "";
  return res.status(204);
});
server.delete("/blog2", (req, res) => {
  blogs[1] = "";
  return res.status(204);
});
server.delete("/blog3", (req, res) => {
  blogs[2] = "";
  return res.status(204);
});

// upon receivign a post at this url execute callback function and save value ot blog
server.get("/blog", (req, res) => res.status(200).send(blogs));

// display the port the server is listening on
// author: Riley OKeefe
mongodb.connect(connectionString, function (error, client) {
  if (error) {
    throw error;
  }

  // This version of mongodb returns a client object
  // which contains the database object
  globalDB = client.db("r_okeefe");
  
  // Inserts a posts collection to store the blogs in the database
  // author: Riley OKeefe
  globalDB.collection("posts").drop(function (dropError, dropSuccess) {
    if (dropSuccess) {
      globalDB.collection("posts").insertMany([
        { id: 1, text: [] },
        { id: 2, text: [] },
        { id: 3, text: [] },
      ]);
    } else if (dropError) throw dropError;
  });

  // Posting blog 1 to the database
  // author: Riley OKeefe
  server.post("/blogs1", updateInsertCB);
  function updateInsertCB(req, res) {
    let query = { id: 1 };
    let value = { $set: { text: req.body.text } };
    globalDB.collection("posts").updateOne(query, value, insertCB1);
    function insertCB1(err, mods, status, foundRecord) {
      if (err == null) {
        return res.status(200).send("SUCCESS: " + req.body.text);
      } else throw err;
    }
  }

  // Posting blog 2 to the database
  // author: Riley OKeefe
  server.post("/blogs2", updateInsertCB2);
  function updateInsertCB2(req, res) {
    let query = { id: 2 };
    let value = { $set: { text: req.body.text } };
    globalDB.collection("posts").updateOne(query, value, insertCB2);
    function insertCB2(err, mods, status, foundRecord) {
      if (err == null) {
        return res.status(200).send("SUCCESS: " + req.body.text);
      } else throw err;
    }
  }

  // Posting blog 3 to the database
  // author: Riley OKeefe
  server.post("/blogs3", updateInsertCB3);
  function updateInsertCB3(req, res) {
    let query = { id: 3 };
    let value = { $set: { text: req.body.text } };
    globalDB.collection("posts").updateOne(query, value, insertCB3);
    function insertCB3(err, mods, status, foundRecord) {
      if (err == null) {
        return res.status(200).send("SUCCESS: " + req.body.text);
      } else throw err;
    }
  }

  // "process" is an already available global variable with information
  // about this particular Node.js application.
  //
  // If the SIGTERM event occurs, use the anonymous function to
  // close the database and server in a controlled way.
  // author: Riley Okeefe
  process.on("SIGTERM", function () {
    console.log("Shutting server down.");
    client.close();
    server.close();
  });

  // Start server listening on port 3172
  var serverside = server.listen(port, function () {
    console.log("Listening on port %d", serverside.address().port);
  });
});
