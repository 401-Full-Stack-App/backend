'use strict';

module.exports = (request, response, next) => {
  const modelName = request.params.model;
  // what are req.params "http://localhost:8080/v1/api/model/:modelName"
  request.model = require(`../model/${modelName}`);
  next();
}
