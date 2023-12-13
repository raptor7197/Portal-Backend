const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('../passport-config');

const secretKey = process.env.SECRET_KEY;

console.log('Secret Key:', secretKey);


const app = express();

app.use(bodyParser.json());

app.use(cors({
  credentials: true,
}));


/*
const newUser = new User({
  username: 'process.env.ADMIN_USERNAME',
  password: 'process.env.ADMIN_PASSWORD' // Replace 'admin_password' with the actual password
});

// Hash the password before saving the user
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(newUser.password, salt, (err, hash) => {
    if (err) throw err;
    newUser.password = hash; // Replace the plain password with the hashed password
    newUser.save()
      .then(user => {
        console.log('User created:', user);
      })
      .catch(err => console.log(err));
  });
});
*/

module.exports = app;
