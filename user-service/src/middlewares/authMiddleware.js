const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate the user
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = authMiddleware;
