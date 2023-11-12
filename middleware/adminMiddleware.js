const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Middleware for handling CORS
app.use(cors());

module.exports = app;
