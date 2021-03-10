const Contact = require('./shemas/shema-contact');

const listContacts = async (
  userId,
  { sortBy, sortByDesc, filter, limit = '5', offset = '0' },
) => {
  const data = await Contact.paginate(
    { owner: userId },
    {
      limit,
      offset,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
      },
      populate: {
        path: 'owner',
        select: 'email subscription -_id',
      },
    },
  );
  const { docs: contacts, totalDocs: total } = data;
  return { total: total.toString(), limit, offset, contacts };
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
  const contact = await Contact.findOneAndRemove({ _id: contactId });
  return contact;
};

const addContact = async body => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContact = async (contactId, body, userId) => {
  const contact = await Contact.findOneAndUpdate(
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
