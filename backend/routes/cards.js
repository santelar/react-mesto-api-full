const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,

} = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/,
      ),
    }),
  }),
  createCard);
router.delete('/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteCard);
router.put('/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  putLike);
router.delete('/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  removeLike);

module.exports = router;
