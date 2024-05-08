const ModuleItem = require("../models/moduleItem");
const Module = require("../models/courseModule");
const Course = require("../models/Course");

// Controller function to create a new module
const createModuleItem = async (req, res) => {
  try {
    const { title, type, url } = req.body;
    const moduleId = req.params.moduleId;

    // Check if all required fields are provided
    if (!title || !type || !url || !moduleId) {
      return res.status(400).json({ success: false, message: "Missing required field(s)" });
    }

    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ success: false, message: "Module not found" });
    }

    // Create the new module item
    const moduleItem = new ModuleItem({ title, type, url });
    await moduleItem.save();

    // Add the module item to the module's moduleItems array
    module.moduleItems.push(moduleItem);
    await module.save();

    // Find the corresponding course document and update it
    const course = await Course.findOneAndUpdate(
      { 'modules._id': moduleId }, // Find course that contains the module
      { $addToSet: { 'modules.$.moduleItems': moduleItem } } // Add module item to the module within the course
    );

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    return res.status(201).json({
      success: true,
      message: "Module Item created successfully",
      data: { moduleItem } // Wrap moduleItem in a 'data' object for consistency
    });
  } catch (error) {
    console.error('Error adding module item:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// Controller function to update a module by ID
const updateModuleItem = async (req, res) => {
  try {
    const { moduleItemId } = req.params;
    const { title, type, url } = req.body;

    // Check if the required fields are provided
    if (!title || !type || !url) {
      return res.status(400).json({ message: "Missing required field" });
    }

    // Find the module item by moduleItemId
    const moduleItem = await ModuleItem.findById(moduleItemId);
    if (!moduleItem) {
      return res.status(404).json({ success: false, message: "Module item not found" });
    }

    // Update the module item
    moduleItem.title = title;
    moduleItem.type = type;
    moduleItem.url = url;
    const updatedModuleItem = await moduleItem.save();

    // Find the course and module containing this module item
    const course = await Course.findOne({ "modules.moduleItems._id": moduleItemId });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const moduleIndex = course.modules.findIndex(module => module.moduleItems.some(item => item._id.toString() === moduleItemId));
    if (moduleIndex === -1) {
      return res.status(404).json({ success: false, message: "Module not found" });
    }

    // Update the module item in the course
    const moduleItemIndex = course.modules[moduleIndex].moduleItems.findIndex(item => item._id.toString() === moduleItemId);
    if (moduleItemIndex !== -1) {
      course.modules[moduleIndex].moduleItems[moduleItemIndex] = updatedModuleItem;
    }

    // Save the updated course
    await course.save();

    res.status(200).json({
      success: true,
      message: "Module item updated successfully",
      moduleItem: updatedModuleItem,
      course: course // Optionally, return the updated course
    });
  } catch (error) {
    console.error("Error while updating module item:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Controller function to delete a module by ID
const deleteModuleItem = async (req, res) => {
  try {
    const { moduleItemId } = req.params;

    // Delete the module item from the ModuleItem collection
    const deletedModuleItem = await ModuleItem.findByIdAndDelete(moduleItemId);
    if (!deletedModuleItem) {
      return res.status(404).json({ success: false, message: "ModuleItem not found" });
    }

    // Find the course containing the module item
    const course = await Course.findOne({ "modules.moduleItems._id": moduleItemId });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Find the module containing the module item and remove it
    course.modules.forEach(module => {
      module.moduleItems = module.moduleItems.filter(item => item._id.toString() !== moduleItemId);
    });

    // Save the updated course document
    await course.save();

    return res.status(200).json({
      success: true,
      message: "Module Item deleted successfully",
      deletedModuleItem,
    });
  } catch (err) {
    console.error("Error while deleting module item:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = { createModuleItem, updateModuleItem, deleteModuleItem };
