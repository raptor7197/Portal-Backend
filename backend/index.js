const app = require('./middleware/adminMiddleware');
const mongoose = require('mongoose');
const cors = require('cors')
const projectRoutes = require('./routes/adminRoutes');
const auth = require('./routes/auth');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)

app.use(cors())

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


