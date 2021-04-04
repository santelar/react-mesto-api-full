require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const { apiLogger, errLogger } = require('./middlewares/logger');
const users = require('./routes/users.js');
const cards = require('./routes/cards.js');
const { loginUser, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/404-notFoundError');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestofull', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('Congratulations!!!'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(apiLogger);

// Краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      // eslint-disable-next-line no-useless-escape
      avatar: Joi.string().pattern(/https?:\/\/w{0,3}[a-z0-9-._~:\/?#[\]@!$&'()*+,;=]{0,}/i),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser);
app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  loginUser);
app.use('/users', auth, users);
app.use('/cards', auth, cards);
app.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors());
app.use(errLogger);

app.use((err, req, res, next) => {
  const { message } = err;
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Ошибка на сервере'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mesto-project start on port ${PORT}`);
});
