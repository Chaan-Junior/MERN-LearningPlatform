const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");

router.post(
  "/register",
  validationMiddleware.registerValidationRules,
  validationMiddleware.validate,
  userController.registerUser
);

router.post(
  "/login",
  validationMiddleware.loginValidationRules,
  validationMiddleware.validate,
  userController.loginUser
);

router.put(
  "/profile",
  authMiddleware,
  validationMiddleware.updateProfileValidationRules,
  validationMiddleware.validate,
  userController.updateUserProfile
);

router.delete("/profile", authMiddleware, userController.deleteUserProfile);

router.put(
  "/role/:userId",
  authMiddleware,
  validationMiddleware.updateRoleValidationRules,
  validationMiddleware.validate,
  userController.updateUserRole
);

router.delete("/user/:userId", authMiddleware, userController.deleteUser);

module.exports = router;
