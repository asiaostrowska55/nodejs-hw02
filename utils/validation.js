const Joi = require("joi").extend(require("joi-phone-number"));

const validateContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().phoneNumber().required(),
});

const validateUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z]).{8,30}$/),
});

module.exports = {
  validateContact,
  validateUser,
};
