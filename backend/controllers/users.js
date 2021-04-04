const { NODE_ENV, JWT_SECRET_KEY } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/400-validationError');
const NotFoundError = require('../errors/404-notFoundError');
const ConflictError = require('../errors/409-conflictError');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    next(new ValidationError('Не переданы данные (email или пароль)'));
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.status(200).send({ name: user.name, email: user.email }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Такой email уже зарегистрирован'));
      }
      next(err);
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new ValidationError('Пароль и email обязательны!'));
  }
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret',
        { expiresIn: '7d' },
      );
      return res.status(200).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
};

const getMyProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      res.status(200).send(user);
    })
    .catch((err) => next(err));
};

const getProfile = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => next(err));
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new ValidationError('Переданы не корректные данные'));
      }
      res.status(200).send(user);
    })
    .catch((err) => next(err));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new ValidationError('Переданы не корректные данные'));
      }
      res.status(200).send(user);
    })
    .catch((err) => next(err));
};

module.exports = {
  getUsers,
  getProfile,
  createUser,
  getMyProfile,
  updateProfile,
  updateAvatar,
  loginUser,
};
