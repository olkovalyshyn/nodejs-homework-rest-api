const Contact = require('./shemas/shema-contact');

const listContacts = async () => {
  const data = await Contact.find({});
  return data;
};

const getContactById = async contactId => {
  const contact = await Contact.findOne({ _id: contactId });
  return contact;
};

const removeContact = async contactId => {
  const contact = await Contact.findByIdAndRemove({ _id: contactId });
  return contact;
};

const addContact = async body => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true },
  );
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
