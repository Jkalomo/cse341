const Contact = require('../models/contact');

// Get all contacts
const getAllContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json(contacts);
};

// Get single contact
const getContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ message: 'Contact not found' });
  res.status(200).json(contact);
};

module.exports = { getAllContacts, getContact };

