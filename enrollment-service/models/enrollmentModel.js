const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  percentage: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;
