const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { default: validator } = require('validator');
const AuthError = require('../errors/401-authError');

const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Введите корректный адрес',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
    },
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Не корректный email или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Не корректный email или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
