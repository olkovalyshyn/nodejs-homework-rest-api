const passport = require('passport');
require('../config/passport');
const { HttpCode } = require('./constants');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    const token = req.get('Authorization')
      ? req.get('Authorization').split(' ')[1]
      : null;

    console.log('!!!user', user);
    console.log('!!!err', err);
    console.log('!!!token', token);
    console.log('!!!user.token', user.token);
    // console.log('!!!req.get', req.get('Authorization').split(' ')[1]);
    // console.log('!!!req', req);

    if (!user || err || token !== user.token) {
      return res.status(HttpCode.FORBIDDEN).json({
        status: 'error',
        code: HttpCode.FORBIDDEN,
        data: 'Forbidden',
        message: 'Access is denied!',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
