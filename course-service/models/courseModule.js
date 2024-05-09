const mongoose = require('mongoose');
const ModuleItem = require('../models/moduleItem');

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    moduleItems: [ModuleItem.schema] 
}, {
    timestamps: true
});

const Module = mongoose.model('Module', moduleSchema);
module.exports = Module;
