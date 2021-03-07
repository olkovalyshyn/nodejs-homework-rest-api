const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;
// const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new Schema(
  {
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
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

// contactSchema.plugin(mongoosePaginate);
const Contact = model('contact', contactSchema);

module.exports = Contact;
