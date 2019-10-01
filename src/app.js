'use strict';

require('dotenv').config();

// 3rd party resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// exporting server and start
module.exports = {
  server: app,
  /** start server on specified port
   * @param port {number} (defaults to process.env.PORT)
   */
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  },
};
