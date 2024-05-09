const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");

// user register
router.post(
  "/register",
  validationMiddleware.registerValidationRules,
  validationMiddleware.validate,
  userController.registerUser
);

// user login
router.post(
  "/login",
  validationMiddleware.loginValidationRules,
  validationMiddleware.validate,
  userController.loginUser
);

// user view profile
router.get("/profile/:userId", authMiddleware, userController.getUserProfile);

// user update profile
router.put(
  "/profile/update/:userId",
  authMiddleware,
  validationMiddleware.updateProfileValidationRules,
  validationMiddleware.validate,
  userController.updateUserProfile
);

// user delete profile
router.delete(
  "/profile/delete/:userId",
  authMiddleware,
  userController.deleteUserProfile
);

// admin update role
router.put(
  "/role/update/:userId",
  authMiddleware,
  validationMiddleware.updateRoleValidationRules,
  validationMiddleware.validate,
  userController.updateUserRole
);

// admin delete user
router.delete(
  "/user/delete/:userId",
  authMiddleware,
  userController.deleteUser
);

// admin view all users
router.get("/users", authMiddleware, userController.getAllUsers);

// admin view users by role
router.get("/users/:role", authMiddleware, userController.getUsersByRole);

// admin grant instructor access
router.put(
  "/instructor/:userId",
  authMiddleware,
  userController.grantInstructorAccess
);

router.put("/addEnrolledCourses/",userController.addEnrolledCourses);

module.exports = router;
