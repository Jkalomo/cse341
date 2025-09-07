require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const contactsRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Root route (optional, just for Render)
app.get('/', (req, res) => {
  res.send('✅ Contacts API is running. Try /api/contacts');
});

// Use contacts routes
app.use('/api/contacts', contactsRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });




