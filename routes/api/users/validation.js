const Joi = require('joi');

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

module.exports.addValidatedUsers = (req, res, next) => {
  return validate(schemaAddUser, req.body, next);
};
