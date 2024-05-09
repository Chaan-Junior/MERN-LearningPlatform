const Course = require("../models/Course");

// Controller function to create a new course
const createCourse = async (req, res) => {
  try {

    const { courseCode, courseName, description, price, courseThumbnail, Instructor, status } = req.body;

    // Check if the required fields are provided
    if (!courseCode || !courseName || !description || !price || !courseThumbnail || !Instructor) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the course already exists
    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
      return res.status(409).json({
        success: false,
        message: "Course already exists",
      });
    }

   // Create and save the new cours
    const course = new Course({
      courseCode,
      courseName,
      description,
      price,
      courseThumbnail,
      Instructor,
      status,
    });
    await course.save();
    if (course) {
      res.status(201).json({
        success: true,
        message: "Course created successfully",
        course,
      });
    } else {
      res.status(400).json({ success: false, error: "Course data not valid" });
    }
  } catch (err) {
    console.error("Error while creating course", { err });
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Controller function to update a course by ID
const updateCourse = async (req, res) => {
    try {
      const { courseCode } = req.params;
      const { courseName, description, price, courseThumbnail, Instructor,status } = req.body;

  // Find the course by courseCode
     const course = await Course.findOne({courseCode: courseCode});
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
  
        // Update the course
      const updatedCourse = await Course.findOneAndUpdate(
        {courseCode: courseCode},
        {courseName, description, price, courseThumbnail, Instructor,status },
        { new: true }
      );
  
      if (!updatedCourse) {
        return res.status(404).json({ success: false, error: "Course not found" });
      }
  
      console.log("Updated course:", updatedCourse);
      return res.status(200).json({
        success: true,
        message: "Course updated successfully",
        course: updatedCourse,
      });
    } catch (error) {
      console.error("Error while updating course:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  

// Controller function to delete a course by ID
const deleteCourse = async (req, res) => {
  try {
    const { courseCode } = req.params;
    const course = await Course.findOneAndDelete({ courseCode: courseCode });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, error: "Course not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      course,
    });
  } catch (err) {
    console.error("Error while deleting course", { err });
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Controller function to get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      success: true,
      message: "All Courses List",
      courses,
    });
  } catch (error) {
    logger.error("Error while getting all courses", { error });
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Controller function to get a course by ID
const getCourseById = async (req, res) => {
  try {
    const { courseCode } = req.params;
    const course = await Course.findOne({ courseCode });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.status(200).json({
      success: true,
      message: "Retrieved Course successfully",
      course,
    });
  } catch (error) {
    console.error("Error while getting course by code:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports = { createCourse, getAllCourses, updateCourse, deleteCourse , getCourseById};
