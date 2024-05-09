const express = require("express");
const router = express.Router();
const {createCourse, getAllCourses, updateCourse, deleteCourse, getCourseById} = require("../controllers/courseController");
const { createModule, } = require("../controllers/moduleController");

// Route to get all courses,
router.get("/courses", getAllCourses);

// Route to create a new course
router.post('/courses', createCourse);

// Route to get a specific course by ID
router.get("/:courseCode", getCourseById);

// Route to update a specific course by ID
router.put("/:courseCode", updateCourse);

// Route to delete a specific course by ID
router.delete("/:courseCode", deleteCourse);

// Route to create a new module for a specific course
router.post('/courses/:courseCode/modules', createModule);

module.exports = router;