const contactsActions = require('../model/contacts-model');
const HttpCode = require('../helpers/constants');

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await contactsActions.listContacts(userId);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
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
      return res.status(HttpCode.OK).json({
        status: 'succsess',
        code: HttpCode.OK,
        data: { contact },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
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
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
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
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'contact deleted',
        data: { contact },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
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
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
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
