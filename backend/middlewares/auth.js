const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;
const AuthError = require('../errors/401-authError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Необходимо авторизоваться'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret');
  } catch (err) {
    next(new AuthError('Необходимо авторизоваться'));
  }
  req.user = payload;

  next();
};
