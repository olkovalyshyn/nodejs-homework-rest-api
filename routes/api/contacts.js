const express = require('express');
const router = express.Router();
const validate = require('./validation');
const contactsControllers = require('../../controllers/contacts-controllers');

router
  .get('/', contactsControllers.getAll)
  .post('/', validate.addValidatedContact, contactsControllers.create);

router
  .get('/:contactId', contactsControllers.getById)
  .delete('/:contactId', contactsControllers.remove)
  .patch('/:contactId', contactsControllers.updateStatus);

module.exports = router;
