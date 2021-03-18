const express = require('express');
const router = express.Router();
const validate = require('./validation');
const usersControllers = require('../../../controllers/users-controllers');
const guard = require('../../../helpers/guard');
const upload = require('../../../helpers/upload');

router.post('/auth/register', validate.addValidatedUsers, usersControllers.reg);

router.post('/auth/login', usersControllers.login);

router.post('/auth/logout', guard, usersControllers.logout);

router.get('/current', guard, usersControllers.getCurrentUser);

router.patch(
  '/avatars',
  [guard, upload.single('avatar'), validate.validateUploadAvatar],
  usersControllers.avatars,
);

http: router.get('/auth/verify/:verificationToken', usersControllers.verify);

module.exports = router;
