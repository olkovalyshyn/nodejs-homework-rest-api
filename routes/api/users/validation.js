const Joi = require('joi');
const { Code } = require('mongodb');
const { HttpCode } = require('../../../helpers/constants');

const schemaAddUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string(),
  subscription: Joi.string(),
  token: Joi.string().allow(''),
});

const validate = (shema, obj, next) => {
  const { error } = shema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message,
    });
  }
  next();
};

const addValidatedUsers = (req, res, next) => {
  return validate(schemaAddUser, req.body, next);
};

const validateUploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bed request',
      message: 'Field of avatar with file not found',
    });
  }
  next();
};

module.exports = {
  addValidatedUsers,
  validateUploadAvatar,
};
