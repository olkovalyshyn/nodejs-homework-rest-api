const express = require('express');
const router = express.Router();
const validate = require('./validation');
const contactsControllers = require('../../../controllers/contacts-controllers');
const guard = require('../../../helpers/guard');

router
  .get('/', guard, contactsControllers.getAll)
  .post('/', guard, validate.addValidatedContact, contactsControllers.create);

router
  .get('/:contactId', guard, contactsControllers.getById)
  .delete('/:contactId', guard, contactsControllers.remove)
  .patch('/:contactId', guard, contactsControllers.updateStatus);

module.exports = router;
