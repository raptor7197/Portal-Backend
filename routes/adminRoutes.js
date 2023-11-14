const express = require('express');
const router = express.Router();
const multer = require('multer');
const Project = require('../models/projectModels');

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new project with image
router.post('/projects', upload.single('image'), async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const imageBuffer = req.file.buffer;

    const base64Image = imageBuffer.toString('base64');

    const project = new Project({
      title,
      description,
      image: base64Image,
    });

    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/projects/:id', async (req, res) => {
  // Implement update logic here
});

router.delete('/projects/:id', async (req, res) => {
  const projectId = req.params.id;

  try {
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
