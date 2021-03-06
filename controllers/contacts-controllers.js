const contactsActions = require('../model/contacts-model');

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await contactsActions.listContacts(userId);
    return res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsActions.getContactById(
      req.params.contactId,
      userId,
    );
    if (contact) {
      return res.json({
        status: 'succsess',
        code: 200,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsActions.addContact({
      ...req.body,
      owner: userId,
    });
    return res.status(201).json({
      status: 'success',
      code: 201,
      body: { contact },
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsActions.removeContact(
      req.params.contactId,
      userId,
    );
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsActions.updateContact(
      req.params.contactId,
      req.body,
      userId,
    );

    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  updateStatus,
};
