// routes/contacts.js
const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getContactById,
} = require('../controllers/contactsController');

// GET all contacts
router.get('/', getAllContacts);

// GET contact by ID
router.get('/:id', getContactById);

module.exports = router;
