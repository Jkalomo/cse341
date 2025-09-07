// testModel.js
require('dotenv').config();
const { connectDB } = require('./db/connect');
const Contact = require('./models/contact');

connectDB()
  .then(() => {
    console.log('MongoDB connected');
    console.log(Contact); // This is Step 4.4 verification
  })
  .catch(err => console.error(err));
