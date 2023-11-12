const express = require('express');
const router = express.Router();
const Project = require('../models/projectModels');

<<<<<<< HEAD
=======
// Get all projects
>>>>>>> master
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
<<<<<<< HEAD
  } catch (error) {
    res.status(500).json({ message: error.message });
=======
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new project
router.post('/projects', async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    // Add more fields as needed
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
>>>>>>> master
  }
});

router.post('/projects', async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    // Add more fields as needed
  });

<<<<<<< HEAD
  try {
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

=======
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


>>>>>>> master
module.exports = router;
