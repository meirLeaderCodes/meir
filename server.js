const logResponseBody = require("./abc")
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(logResponseBody);


app.get("/aaa", function (req, res) {
  res.send("aaa");
});

app.get("/bbb", function (req, res) {
  res.send("bbb");
});
app.get("/ccc", function (req, res) {
  res.send("ccc");
});

app.get("/ddd", function (req, res) {
  res.send("ddd");
});

app.listen(3000);
