// enrollmentController.js
const Enrollment = require("../models/enrollmentModel");
//const User = require("../models/userModel");
//const Course = require("../models/Course");
const { sendEmail } = require("../util/email");

// Controller function to create a new enrollment
const createEnrollment = async (req, res) => {
  try {
    const { courseId, userId ,email} = req.body;

    // Check if the user is already enrolled in the course
    const existingEnrollment = await Enrollment.findOne({ userID: userId, courseID: courseId });
    if (existingEnrollment) {
      return res.status(409).json({ success: false, message: "User is already enrolled in this course" });
    }

    const enrollment = new Enrollment({ userID: userId, courseID: courseId });
    await enrollment.save();


        //SEND NOTIFICATION
        const subject='Your enrollment has been added';
        const content=`
        <h1>Enrollment Added</h1>
        <p>We have sucessfully added a enrollment with your account</p>
      `
        await sendEmail(`${email}`,subject,content);
    // Removed for brevity

    res.status(201).json({ success: true, message: "Enrollment created successfully", enrollment });
  } catch (error) {
    console.error("Error creating enrollment:", error);
    res.status(500).json({ success: false, message: "Error creating enrollment" });
  }
};


const checkEnrollment = async (req, res) => {
  try {
    const { courseId, userId} = req.body;

    const existingEnrollment = await Enrollment.findOne({ userID: userId, courseID: courseId });
    const bool = existingEnrollment ? true : false;
    res.status(200).json({value : bool});
  } catch (error) {
    console.error("Error checking enrollment:", error);
    return false;
  }
};


// Controller function to retrieve enrollments by userID
const getEnrollmentsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const enrollments = await Enrollment.find({ userID: userId});

    if (enrollments.length > 0) {
      res.status(200).json({ success: true, message: "Active enrollments retrieved successfully", enrollments });
    } else {
      res.status(404).json({ success: false, message: "No active enrollments found for this user" });
    }
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ success: false, message: "Error fetching enrollments" });
  }
};

// Controller function to deactivate enrollment
/*onst deactivateEnrollment = async (req, res) => {
  try {
    const enrollmentId = req.params.enrollmentId;
    const enrollment = await Enrollment.findByIdAndUpdate(enrollmentId, { isActive: false }, { new: true });

    if (enrollment) {
      res.status(200).json({ success: true, message: "Enrollment deactivated successfully", enrollment });
    } else {
      res.status(404).json({ success: false, message: "Enrollment not found" });
    }
  } catch (error) {
    console.error("Error deactivating enrollment:", error);
    res.status(500).json({ success: false, message: "Error deactivating enrollment" });
  }
};*/

module.exports = { createEnrollment, getEnrollmentsByUserId, checkEnrollment};
