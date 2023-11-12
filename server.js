const app = require('./middleware/adminMiddleware');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/adminRoutes');

// Connect to MongoDB
mongoose.connect("mongodb+srv://alirashid:i4SG57W4jWqVZgTZ@test-db.nasboea.mongodb.net/?retryWrites=true&w=majority")

// Use project routes
app.use('/api', projectRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
