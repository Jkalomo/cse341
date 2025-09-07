// server.js
require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db/connect');
const contactsRouter = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/contacts', contactsRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));

