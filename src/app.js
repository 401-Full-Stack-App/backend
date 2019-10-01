'use strict';

// app.js is for housing routes, models, middlware(s)

const express = require('express');
require('dotenv').config();

// models: (controlling Mongo resources)

// middleware:
// 3rd party resources
// app level middleware libraries
const cors = require('cors');
const morgan = require('morgan');

// routes:
const authRouter = require('./route/auth.js');

// custom middleware: 
const errorHandler = require('./middleware/server-error');
const notFound = require('./middleware/not-found.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use('*', notFound);
app.use(errorHandler);

// exporting server and start
module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on ${PORT}`);
    });
  },
};
