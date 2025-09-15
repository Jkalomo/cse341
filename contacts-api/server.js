const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initDb } = require('./data/database');
const { swaggerUi, specs } = require('./swagger');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/contacts', require('./routes/contacts'));

// Default route
app.get('/', (req, res) => {
  res.send(`
    <h1>Contacts API</h1>
    <p>Welcome to the Contacts API!</p>
    <p><a href="/api-docs">View API Documentation</a></p>
  `);
});

// Initialize database and start server
initDb((err, db) => {
  if (err) {
    console.log('❌ Failed to connect to database:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Database connected successfully!');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    });
  }
});




