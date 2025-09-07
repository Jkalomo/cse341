const express = require('express');
const router = express.Router();
const { getAllContacts, getContact } = require('../controllers/contactsController');

// GET all contacts
router.get('/', getAllContacts);

// GET a single contact by id
router.get('/:id', getContact);

module.exports = router;

