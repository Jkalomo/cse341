const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../data/database');

// GET /contacts - Get all contacts
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    console.log('Database name:', db.databaseName);
    console.log('Fetching all contacts...');
    const contacts = await db.collection('contacts').find().toArray();
    console.log('Found contacts count:', contacts.length);
    console.log('Contact IDs:', contacts.map(c => c._id.toString()));
    
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// GET /contacts/:id - Get single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid contact ID format' });
    }
    
    const db = getDb();
    console.log('Searching in database...');
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    console.log('Search result:', contact);
    
    if (!contact) {
      console.log('Contact not found');
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    console.log('Sending contact response');
    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

module.exports = router;
