// models/contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /.+@.+\..+/,
    },
    favoriteColor: { type: String, trim: true },
    birthday: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
