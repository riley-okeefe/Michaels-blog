const express = require("express"); // start express application
const server = express(); // define top level function
const port = 3039; // port number
const blog = ["", "", ""]; // array to save contents of retrieved input

 server.use(express.json()); // implement JSON recognition
 server.use(express.urlencoded({ extended: true })); // implement incoming name:value pairs to be any type

 let allowCrossDomain = function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*"); // allow any origin
   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // allow any method
   res.header("Access-Control-Allow-Headers", "Content-Type"); // accept only headers with this type
   next(); // middleware callback function required for processing
 };
 server.use(allowCrossDomain); // implement allowable domain characteristics

 // Upon receiving a post at this url execute callback function
  server.get("/inputBox", function (req, res) {
    blog[0] = (req.body.input);
    console.log("input:" + req.body.input);

    return res.status(200).send(blog);
  });


 //Upon receiving a post at this url execute callback function on page load
    server.get("/myGet", function (req, res) {
      console.log(blog);

      return res.status(200).send(blog);
    });
 
 // Reminds user on server side of port being used
 server.listen(port, function () {
   console.log("Listening on port 3039");
 });