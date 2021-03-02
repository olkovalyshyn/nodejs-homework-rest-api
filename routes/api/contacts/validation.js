const Joi = require('joi');

const schemaAddContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]/)
    .required(),
  subscription: Joi.string(),
  password: Joi.string(),
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

module.exports.addValidatedContact = (req, res, next) => {
  return validate(schemaAddContact, req.body, next);
};
