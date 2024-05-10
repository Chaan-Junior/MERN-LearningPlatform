// enrollmentRoutes.js
const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");
const { verifyToken } = require("../middleware/jwtAuthUtils");

// POST endpoint for creating enrollment
router.post("/enroll", enrollmentController.createEnrollment);

// GET endpoint to retrieve enrollments by userID
router.get("/enrolledUser/:userId", enrollmentController.getEnrollmentsByUserId);

router.post("/checkEnrollment", enrollmentController.checkEnrollment);

router.put("/updateProgress", enrollmentController.updateProgress);

// DELETE endpoint to deactivate enrollment
//router.delete("/:enrollmentId", verifyToken, enrollmentController.deactivateEnrollment);

module.exports = router;