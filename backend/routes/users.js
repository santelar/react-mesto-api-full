const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getMyProfile,
  getProfile,
  updateProfile,
  updateAvatar,
} = require('../controllers/users.js');


router.get('/users', getUsers);
router.get('/users/me', getMyProfile);
router.get('/users/:id', getProfile);
router.patch('/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile);
router.patch('/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required()
        .pattern(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/,
        ),
    }),
  }),
  updateAvatar);

module.exports = router;
