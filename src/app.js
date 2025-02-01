const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const healthRoutes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config(); // Load environment variables

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api/users', userRoutes); // Add user routes

const uri = process.env.MONGODB_URI; // Use environment variable
console.log('MongoDB URI:', uri); // Debugging line

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
