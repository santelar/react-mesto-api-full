const winston = require('winston');
const expressWinston = require('express-winston');

const apiLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

const errLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'errors.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  apiLogger,
  errLogger,
};
