const { response } = require('express');
const morgan = require('morgan');

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :body'
);

// Handlin' undefined routes..
const unknownEndpoint = (req, res, next) => {
  console.log('Nonexistent')
  res.status(404).json({ error: 'Unknown endpoint' });
};

module.exports = { requestLogger, unknownEndpoint };
