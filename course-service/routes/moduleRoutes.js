const express = require("express");
const router = express.Router();
const {createModule, updateModule, deleteModule, getAllModules, getModuleById} = require("../controllers/moduleController");
const{createModuleItem} = require("../controllers/moduleItemController")

// Route to get all modules,
router.get("/modules", getAllModules);

// Route to create a new modules
router.post('/modules', createModule);

// Route to get a specific modules by ID
router.get("/:moduleId", getModuleById);

// Route to update a specific modules by ID
router.put("/:moduleId", updateModule);

// Route to delete a specific modules by ID
router.delete("/:moduleId", deleteModule);

// Route to create a specific modules items by module ID
router.post("/:moduleId/items", createModuleItem);

module.exports = router;