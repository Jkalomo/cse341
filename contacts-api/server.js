const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initDb } = require('./data/database');

const app = express();
const PORT = process.env.PORT || 8080;

// Debug: Check if environment variables are loaded
console.log('Environment check:');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI starts with mongodb:', process.env.MONGODB_URI?.startsWith('mongodb'));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/contacts', require('./routes/contacts'));

// Default route
app.get('/', (req, res) => {
  res.send('Hello World! Contacts API is running.');
});

// Initialize database and start server
initDb((err, db) => {
  if (err) {
    console.log('❌ Failed to connect to database:', err.message);
    console.log('Full error:', err);
    process.exit(1);
  } else {
    console.log('✅ Database connected successfully!');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  }
});




