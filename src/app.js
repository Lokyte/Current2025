const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const healthRoutes = require('./routes/healthRoutes');
require('dotenv').config(); // Load environment variables

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', healthRoutes);

const uri = process.env.MONGODB_URI; // Use environment variable
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;