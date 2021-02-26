const Contact = require('../model/shemas/shema-contact');

// const fs = require("fs/promises");
const fs = require('fs').promises;
const path = require('path');
// const shortid = require("shortid");

const contactsPath = path.join(__dirname, './contacts.json');

// const listContacts = async () => {
//   const data = await fs.readFile(contactsPath, 'utf8');
//   return JSON.parse(data);
// };
const listContacts = async () => {
  const data = await Contact.find({});
  return data;
};

// const getContactById = async contactId => {
//   const contacts = await listContacts();
//   const contact = contacts.find(({ id }) => id.toString() === contactId);
//   return contact;
// };
const getContactById = async contactId => {
  const contact = await Contact.find({ _id: contactId });
  return contact;
};

// const removeContact = async contactId => {
//   const contacts = await listContacts();
//   const contact = contacts.find(({ id }) => id.toString() === contactId);
//   const newContacts = contacts.filter(({ id }) => id.toString() !== contactId);
//   await fs.writeFile(
//     contactsPath,
//     JSON.stringify(newContacts, null, 2),
//     'utf8',
//   );
//   return contact;
// };
const removeContact = async contactId => {
  const contact = await Contact.findByIdAndRemove({ _id: contactId });
  return contact;
};

// const addContact = async body => {
//   const contacts = await listContacts();
//   const newContact = {
//     // id: shortid.generate(),
//     ...body,
//   };
//   const newContacts = [...contacts, newContact];
//   await fs.writeFile(
//     contactsPath,
//     JSON.stringify(newContacts, null, 2),
//     'utf8',
//   );
//   return newContact;
// };
const addContact = async body => {
  const newContact = await Contact.create(body);
  return newContact;
};

// const updateContact = async (contactId, body) => {
//   try {
//     const contacts = await listContacts();
//     const indexContactForUpdate = contacts.findIndex(
//       ({ id }) => id.toString() === contactId,
//     );
//     if (indexContactForUpdate === -1) return;
//     contacts[indexContactForUpdate] = {
//       ...contacts[indexContactForUpdate],
//       ...body,
//     };
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8');
//     return contacts[indexContactForUpdate];
//   } catch (error) {
//     console.error(error);
//   }
// };
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
