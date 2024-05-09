const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./src/routes/userRoute");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 7000;
const DB_URI = process.env.DB_URI;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoute);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("🔌 Connected to the Database");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server is running on Port ${PORT}`);
});

module.exports = app;
