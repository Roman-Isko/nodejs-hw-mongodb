const express = require('express');
const cors = require('cors');
const pino = require('pino');
const pinoHttp = require('pino-http');
const contactsRouter = require('./routes/contacts');

const logger = pino();

function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(pinoHttp({ logger }));

  app.use('/contacts', contactsRouter);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((err, req, res, next) => {
    logger.error(err);
    const status = err.status || 500;
    res
      .status(status)
      .json({ message: err.message || 'Internal Server Error' });
  });

  return app;
}

module.exports = setupServer;
