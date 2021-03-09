const jwt = require('jsonwebtoken');
const usersActions = require('../model/user-model');
const { HttpCode } = require('../helpers/constants');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

const reg = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await usersActions.findByEmail(email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'Email is alredy use!',
      });
    }

    const newUser = await usersActions.addUser(req.body);
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersActions.findByEmail(email);
    const isValidePassword = await user.validPassword(password);
    if (!user || !isValidePassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: 'UNAUTHORIZED',
        message: 'Invalid credentials!',
      });
    }

    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
    await usersActions.updateToken(id, token);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await usersActions.updateToken(id, null);
    return res.status(HttpCode.NO_CONTENT).json({});
  } catch (error) {
    console.log('!!!next(error)', next(error));
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await usersActions.findById(userId);
    if (contact) {
      return res.json({
        status: 'succsess',
        code: HttpCode.OK,
        data: {
          email: contact.email,
          subscription: contact.subscription,
        },
      });
    } else {
      return res.json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'Not authorized',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { reg, login, logout, getCurrentUser };
