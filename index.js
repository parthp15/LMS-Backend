const mongoose = require("mongoose");
const express = require("express");
const app = express();
const authors = require("./routes/authors");

app.use(express.json());

mongoose
  .connect("mongodb://localhost/LMS-backend")
  .then(() => console.log("connection sucessfull"))
  .catch((err) => console.log("connection failed", err));

app.use("/api/authors", authors);
app.listen(4000, () => console.log("running on port 4000"));
