const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const AuthError = require('../errors/401-authError');
const { default: validator } = require('validator');

const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Юрий Гагарин',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Космонавт',
  },
  avatar: {
    required: false,
    type: String,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Введите корректный адрес',
    },
    default: 'https://yt3.ggpht.com/ytc/AAUvwnj3kQctos-7S-eJBP-qoM6v_9QLWcpGeRVxtKa5=s900-c-k-c0x00ffffff-no-rj',
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
