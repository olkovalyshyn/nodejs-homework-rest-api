const express = require('express');
const router = express.Router();
const validate = require('./validation');
const usersControllers = require('../../../controllers/users-controllers');

router.post('/auth/register', usersControllers.reg);

router.post('/auth/login', usersControllers.login);

router.post('/auth/logout', usersControllers.logout);

module.exports = router;
