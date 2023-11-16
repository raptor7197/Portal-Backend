const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, max: 5 }] // Array of strings for up to 5 images
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
