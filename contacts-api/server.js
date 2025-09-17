const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initDb } = require('./data/database');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Swagger Documentation (with error handling)
try {
  const { swaggerUi, specs } = require('./swagger');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log('✅ Swagger documentation loaded');
} catch (error) {
  console.log('⚠️ Swagger not available:', error.message);
}

// Routes
app.use('/contacts', require('./routes/contacts'));

// Default route with API info
app.get('/', (req, res) => {
  res.json({
    message: 'Contacts API',
    version: '1.0.0',
    endpoints: {
      'GET /contacts': 'Get all contacts',
      'GET /contacts/:id': 'Get contact by ID',
      'POST /contacts': 'Create new contact',
      'PUT /contacts/:id': 'Update contact',
      'DELETE /contacts/:id': 'Delete contact'
    },
    documentation: '/api-docs',
    status: 'running'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    method: req.method,
    path: req.originalUrl
  });
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
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
    });
  }
});




