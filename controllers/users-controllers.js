const jwt = require('jsonwebtoken');
const usersActions = require('../model/user-model');
const fs = require('fs').promises;
const path = require('path');
const Jimp = require('jimp');
const { nanoid } = require('nanoid');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

const { HttpCode } = require('../helpers/constants');
const EmailService = require('../services/email');
const createFolderIsExist = require('../helpers/create-dir');

const reg = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await usersActions.findByEmail(email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'Email is alredy use!',
      });
    }
    const verificationToken = nanoid();
    const emailService = new EmailService(process.env.NODE_ENV);

    await emailService.sendEmail(verificationToken, email, name);
    const newUser = await usersActions.addUser({
      ...req.body,
      verify: false,
      verificationToken,
    });

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
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
    const isValidPassword = (await user)
      ? await user.validPassword(password)
      : null;
    if (!user || !isValidPassword || !user.verify) {
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

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const avatarUrl = await saveAvatarToStatic(req);
    await usersActions.updateAvatar(id, avatarUrl);
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        avatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

const saveAvatarToStatic = async req => {
  const id = req.user.id;
  const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
  const pathFile = req.file.path;
  const newNameAvatar = `${Date.now()}-${req.file.originalname}`;
  const img = await Jimp.read(pathFile);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);
  await createFolderIsExist(path.join(AVATARS_OF_USERS, id));
  await fs.rename(pathFile, path.join(AVATARS_OF_USERS, id, newNameAvatar));
  const avatarUrl = path.normalize(path.join(id, newNameAvatar));

  try {
    await fs.unlink(
      path.join(process.cwd(), AVATARS_OF_USERS, req.user.avatarURL),
    );
  } catch (error) {
    console.log(error.message);
  }
  return avatarUrl;
};

const verify = async (req, res, next) => {
  try {
    const user = await usersActions.findByVerificationToken(
      req.params.verificationToken,
    );

    if (user) {
      await usersActions.updateVerificationToken(user.id, true, null);
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        message: 'Verification successful!',
      });
    }
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad request!',
      message: 'Link is not valid!',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { reg, login, logout, getCurrentUser, avatars, verify };
