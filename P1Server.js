const express = require("express");
const server = express();
const port = 3039;
const blogs = ["", "", ""];

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

server.use(allowCrossDomain);

// upon receivign a post at this url save value ot blog
server.post("/blog1", function (req, res) {
  blogs[0] = req.body.input;
  let obj = { input: blogs[0] };
  console.log(obj);
  return res.status(200).send(obj);
});

// upon receivign a post at this url execute callback function and save value ot blog
server.post("/blog2", function (req, res) {
  blogs[1] = req.body.input;
  let obj = { input: blogs[1] };
  console.log(obj);
  return res.status(200).send(obj);
});

// upon receivign a post at this url execute callback function and save value ot blog
server.post("/blog3", function (req, res) {
  blogs[2] = req.body.input;
  let obj = { input: blogs[2] };
  console.log(obj);
  return res.status(200).send(obj);
});

// upon receivign a post at this url execute callback function and save value ot blog
server.get("/", (req, res) => res.status(200).send(blogs));

// display the port the server is listening on
server.listen(port, function () {
  console.log("Listening on port 4300");
});
