const express = require('express');
const router = express.Router();
const multer = require('multer');
const Project = require('../models/projectModels');

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

router.post('/projects', upload.array('images'), async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    console.log('Before creating project...');
    const images = req.files.map(file => {
      const base64Image = file.buffer.toString('base64');
      return base64Image;
    });

    const project = new Project({
      title,
      description,
      images,
    });

    console.log('Before saving project...');
    const newProject = await project.save();
    console.log('Project saved successfully.');

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error in /projects POST route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.patch('/projects/:id', upload.array('images'), async (req, res) => {
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

    // Update image data if new images are provided
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => {
        const base64Image = file.buffer.toString('base64');
        return base64Image;
      });
      project.images = newImages;
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
