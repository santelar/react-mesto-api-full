const Card = require('../models/card');
const ForbiddenError = require('../errors/403-forbiddenError');
const NotFoundError = require('../errors/404-notFoundError');
const ValidationError = require('../errors/400-validationError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ body: card }))
    .catch((err) => next(err));
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;
  Card
    .findOne({ _id: req.params.cardId })
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(owner)) {
        next(new ForbiddenError('Нет прав на удаление этой карточки'));
      } else {
        Card.deleteOne(card)
          .then(() => res.status(200).send({ message: 'Карточка удалена' }));
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new ValidationError('Невалидный id карточки'));
      } else {
        next(err);
      }
    });
};

const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка места не найдена'))
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => next(err));
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка места не найдена'))
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => next(err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
};
