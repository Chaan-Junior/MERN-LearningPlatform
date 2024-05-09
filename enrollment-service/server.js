const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const enrollmentRoutes = require("./routes/enrollmentRoute");
const cors = require("cors");

const app = express();

const PORT = 3002;
const DB_URI = "mongodb+srv://Shobi:Shobi2000@course-service.8eivznc.mongodb.net/Coursedb?retryWrites=true&w=majority&appName=course-service";

app.use(cors({
  origin: 'http://localhost:5173'
}));

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });

// Routes
app.use("/api/enroll", enrollmentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

module.exports = app;
