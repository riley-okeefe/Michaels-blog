const express = require("express");
const server = express();
const port = 3172;
const blogs = ["", "", ""];

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

server.use(allowCrossDomain);

// upon receivign a post at this url save value ot blog
server.post("/blog1", function (req, res) {
  blogs[0] = req.body.input;
  console.log("input1:" + req.body.input)
  let obj = { input: blogs[0] };
  return res.status(200).send(obj);
});

// upon receivign a post at this url execute callback function and save value ot blog
server.post("/blog2", function (req, res) {
  blogs[1] = req.body.input;
  console.log("input2:" + req.body.input)
  let obj = { input: blogs[1] };
  return res.status(200).send(obj);
});

// upon receivign a post at this url execute callback function and save value ot blog
server.post("/blog3", function (req, res) {
  blogs[2] = req.body.input;
  console.log("input3:" + req.body.input)
  let obj = { input: blogs[2] };
  return res.status(200).send(obj);
});

server.delete("/blog1", (req, res) => {
  blogs.splice(0, 1);
  return res.send();
});
server.delete("/blog2", (req, res) => {
  blogs.splice(1, 1);
  return res.send();

});
server.delete("/blog3", (req, res) => {
  blogs.splice(2, 1);
  return res.send();

});

// upon receivign a post at this url execute callback function and save value ot blog
server.get("/blog", (req, res) => res.status(200).send(blogs));

// display the port the server is listening on
server.listen(port, function () {
  console.log("Listening on port 3172");
});
