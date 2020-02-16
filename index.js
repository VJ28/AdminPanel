require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const router = express.Router();
const httpserver = require("http").Server(app);
require("./db").initDb();
const routes = require("./routes/index").routes;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use((req, res, next) => {
  console.log("hit the route", req.url);
  next();
});

app.use(router);
routes(router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

router.get("/", (req, res) => {
  console.log("in home", req.query.name);
  res.status(200).send("Ok");
});

router.get("/home", (req, res) => {
  console.log("in home", req.query.name);
  res.sendFile(path.resolve(__dirname + "/index.html"));
});

httpserver.listen(process.env.PORT, () => {
  console.log("running on ", process.env.PORT);
});

// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log(req.url);
//   res.end("<h1>hello world</h1>");
// });

// server.listen(4001, () => {
//   console.log("running on 4001");
// });
