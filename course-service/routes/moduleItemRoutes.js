const express = require("express");
const router = express.Router();
const {createModuleItem, updateModuleItem, deleteModuleItem} = require("../controllers/moduleItemController");

// Route to create a new module item
//router.post('/moduleItems', createModuleItem);

// Route to update a specific module item by ID
router.put('/moduleItems/:moduleItemId', updateModuleItem);

// Route to delete a specific module item by ID
router.delete("/:moduleId/items/:moduleItemId", deleteModuleItem);


module.exports = router;