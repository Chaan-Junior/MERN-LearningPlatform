const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["learner", "instructor", "admin"],
    default: "learner",
  },
  enrolledCourses: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Course",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
