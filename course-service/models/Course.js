const mongoose = require('mongoose');
const Module = require('../models/courseModule').schema; 

const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String, 
        required: true 
    },
    courseName: {
        type: String, 
        required: true 
    },
    description: {
        type: String, 
        required: true 
    },
    price: {
        type: Number, 
        required: true 
    },
    courseThumbnail: {
        type: String,
        required: true 
    },
    modules: [Module],
    Instructor: [
        {
            type: String,
            required: true
        }
    ],
    status: {
      type: String,
      enum: ['published', 'approved', 'rejected', 'republish'],
      default: 'published'
    },
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
