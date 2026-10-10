const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");

const app = express();

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connection to MongoDB:", error.message);
  });

app.use(express.json());
app.use("/api/blogs", blogsRouter);

module.exports = app;
