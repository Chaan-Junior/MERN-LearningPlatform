const express = require('express');
const ConnectDb = require("./config/dbConnection");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

ConnectDb();

const app = express();

const PORT = process.env.PORT || "8070";

app.use(cors());
app.use(bodyParser.json());

app.use("/api", require("./routes/courseRoute"));
app.use("/api/module", require("./routes/moduleRoutes"));
app.use("/api/item", require("./routes/moduleItemRoutes"));

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})

module.exports = app;
