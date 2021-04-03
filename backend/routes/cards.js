const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCard,
  getCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,

} = require('../controllers/cards.js');

router.get('/cards/:cardId', getCard);
router.get('/cards', getCards);
router.post('/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/,
      ),
    }),
  }),
  createCard);
router.delete('/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex(),
    }),
  }),
  deleteCard);
router.put('/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  putLike);
router.delete('/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().length(24).hex(),
    }),
  }),
  removeLike);

module.exports = router;
