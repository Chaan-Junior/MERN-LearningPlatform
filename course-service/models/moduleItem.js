const mongoose = require('mongoose');

const moduleItemSchema = new mongoose.Schema({
  title: { type: String },
  type: { type: String, enum: ['video', 'file'] },
  url: { type: String}
}, {
  timestamps: true
});

const ModuleItem = mongoose.model('ModuleItem', moduleItemSchema);
module.exports = ModuleItem;
