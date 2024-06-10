const express = require('express');
const router = express.Router();

router.post('/checkToken', (req, res) => {
 const token = req.headers.authorization || req.body.token;

 if (!token) {
   return res.status(401).send({ message: 'No token provided' });
 }

 jwt.verify(token, secretKey, (err, decoded) => {
   if (err) {
     return res.status(500).send({ message: 'Failed to authenticate token' });
   }

   // If everything is good, save to request for use in other routes
   req.userId = decoded.id;
   return res.status(200).send({ message: 'Token is valid' });
 });
});

module.exports = router;