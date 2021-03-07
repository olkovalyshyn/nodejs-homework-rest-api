const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;
const usersActions = require('../model/user-model');

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      // console.log('!!!payload in pasport', payload);

      const user = await usersActions.findById(payload.id);
      // console.log('!!!user in password', user);
      if (!user) {
        return done(new Error('User not found!'));
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }),
);
