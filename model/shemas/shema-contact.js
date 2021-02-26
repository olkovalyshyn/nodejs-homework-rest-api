const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'Set phone for contact'],
  },
  subscription: {
    type: [String, 'Wrong type'],
  },
  password: {
    type: String,
    required: [true, 'Set password for contact'],
  },
  token: {
    type: String,
  },
});

const Contact = model('contact', contactSchema);

module.exports = Contact;
