const Contact = require('./shemas/shema-contact');

const listContacts = async userId => {
  const data = await Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'email subscription -_id',
  });
  return data;
};

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'email subscription -_id',
  });
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

const updateContact = async (contactId, body, userId) => {
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
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
