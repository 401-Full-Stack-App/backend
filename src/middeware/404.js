'use strict';

module.exports = (req, res) => {
  const error = { error: 'Resource Not Found' };
  res.status(404).json(error);
};
