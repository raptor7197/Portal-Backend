const express = require('express');
const router = express.Router();
const multer = require('multer');
const Project = require('../models/projectModels');
const { ObjectId } = require('mongodb');

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/projects/:id', async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


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

router.patch('/projects/:id', upload.single('image'), async (req, res) => {
  const projectId = req.params.id;
  const { title, description } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update text data
    if (title) {
      project.title = title;
    }

    if (description) {
      project.description = description;
    }

    // Update image data if a new image is provided
    if (req.file) {
      const newImageBuffer = req.file.buffer;
      const base64Image = newImageBuffer.toString('base64');
      project.image = base64Image;
    }

    // Save the updated project
    const updatedProject = await project.save();

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
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
