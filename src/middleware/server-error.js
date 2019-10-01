'use strict';

module.exports = (err, req, res) => {
  console.log('__SERVER_ERROR__', err);
  const error = { error: err.message || err };
  res.status(500).json(error);
};
