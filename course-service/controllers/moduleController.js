const Course = require('../models/Course'); 
const Module = require('../models/courseModule'); 

const createModule = async (req, res) => {
  try {
    const { title } = req.body;
    const courseCode = req.params.courseCode;

    // Check if the required fields are provided
    if (!title || !courseCode) {
      return res.status(400).json({ message: "Missing required field" });
    }

    // Find the course by its courseCode
    const course = await Course.findOne({ courseCode: courseCode });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Create the new module
    const module = new Module({ title });
    await module.save();

    // Add the module to the course's modules array
    course.modules.push(module);
    await course.save();

    res.status(201).json({
      success: true,
      message: "Module created successfully",
      module,
    });
  } catch (err) {
    console.error("Error while creating module:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { createModule };



// Controller function to update a module by ID
const updateModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { title } = req.body;

    // Check if the required fields are provided
    if (!title) {
      return res.status(400).json({ message: "Missing required field" });
    }

    // Find the module by moduleId
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ success: false, message: "Module not found" });
    }

    // Update the module
    module.title = title;
    const updatedModule = await module.save();

    res.status(200).json({
      success: true,
      message: "Module updated successfully",
      module: updatedModule,
    });
  } catch (error) {
    console.error("Error while updating module:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Controller function to delete a module by ID
const deleteModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const module = await Module.findByIdAndDelete(moduleId);
    if (!module) {
      return res.status(404).json({ success: false, message: "Module not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Module deleted successfully",
      module,
    });
  } catch (err) {
    console.error("Error while deleting module:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Controller function to get all modules
const getAllModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.status(200).json({
      success: true,
      message: "All modules list",
      modules,
    });
  } catch (error) {
    console.error("Error while getting all modules:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Controller function to get a module by ID
const getModuleById = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ success: false, message: "Module not found" });
    }
    res.status(200).json({
      success: true,
      message: "Retrieved module successfully",
      module,
    });
  } catch (error) {
    console.error("Error while getting module by ID:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { createModule, getAllModules, updateModule, deleteModule, getModuleById };
