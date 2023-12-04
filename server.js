const app = require('./middleware/adminMiddleware');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/adminRoutes');
const auth = require('./routes/auth');

// Connect to MongoDB
mongoose.connect("mongodb+srv://alirashid:i4SG57W4jWqVZgTZ@test-db.nasboea.mongodb.net/?retryWrites=true&w=majority")

// Use project routes
app.use('/api', projectRoutes);
app.use('/',auth);
/*
const crypto = require('crypto');

// Generate a secure random key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};


// Output the generated key
const secretKey = generateSecretKey();
console.log('Generated Secret Key:', secretKey);

*/

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


