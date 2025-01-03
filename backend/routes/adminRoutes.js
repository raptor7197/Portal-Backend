const express = require('express');
const router = express.Router();
const multer = require('multer');
const Project = require('../models/projectModels');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: 'none',
};

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.cookie('jwt', token, COOKIE_OPTIONS);
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('jwt', COOKIE_OPTIONS);
  res.json({ message: 'Logged out successfully' });
});

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

router.post('/projects', passport.authenticate('jwt', { session: false }), upload.array('images'), async (req, res) => {
  const { title, description, githublink } = req.body;
  if (!title || !description || !githublink) {
    return res.status(400).json({ message: 'Title, description, and GitHub link are required' });
  }
  try {
    console.log("works")
    const images = req.files.map(file => {
      const base64Image = file.buffer.toString('base64');
      return base64Image;
    });
    const project = new Project({
      title,
      description,
      images,
      githublink
    });
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/projects/:id', passport.authenticate('jwt', { session: false }), upload.array('images'), async (req, res) => {
  const projectId = req.params.id;
  const { title, description, githublink } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (title) project.title = title;
    if (description) project.description = description;
    if (githublink) project.githublink = githublink;

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.buffer.toString('base64'));
      project.images = newImages;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/projects/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
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
