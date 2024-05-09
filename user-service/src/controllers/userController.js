const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ user, message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid Email, Try again!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid Password, Try again!");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name },
      JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Clear token from localStorage
    localStorage.removeItem("token");
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("User not found");
    }

    user.name = name;
    user.email = email;

    await user.save();
    res.json({ user, message: "User profile updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("User not found");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User profile deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const userId = req.params.userId;
    const { role } = req.body;

    const user = await User.findById(userId);
    console.log(role);
    console.log(user);

    if (!user) {
      throw new Error("User not found");
    }

    user.role = role;
    await user.save();
    res.json({ user, message: "User role updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 1. User can view their details
const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      // Only admins can access this route
      throw new Error("Unauthorized");
    }
    const users = await User.find({}, { password: 0 }); // Exclude password field
    res.json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2. Admin can view all registered users
const getUsersByRole = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      // Only admins can access this route
      throw new Error("Unauthorized");
    }
    const role = req.params.role;
    const users = await User.find({ role }, { password: 0 }); // Exclude password field
    res.json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 3. Admin can view users by their roles (learners, instructors)
const grantInstructorAccess = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      // Only admins can access this route
      throw new Error("Unauthorized");
    }
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.role = "instructor";
    user.instructorAccess = req.body.instructorAccess; // Set instructor access permissions
    await user.save();
    res.json({ user, message: "Instructor access granted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error("User not found");
    }
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  deleteUserProfile,
  updateUserRole,
  deleteUser,
  getAllUsers,
  getUsersByRole,
  grantInstructorAccess,
  getUserProfile,
};
