/* eslint-disable no-use-before-define */

'use strict';

const express = require('express');
// Use model-finder middleware to import modles
const modelFinder = require('../middleware/model-finder.js');
// eslint-disable-next-line no-unused-vars
const auth = require('../middleware/auth.js');

const router = express.Router();

router.param('model', modelFinder);

router.get('/api/version1/:model', getAllHandler);
router.get('/api/version1/:model/:id', getOneHandler);

router.post('/api/version1/:model/', postHandle);
router.put('/api/version1/:model/:id', putHandle);
router.delete('/api/version1/:model/:id', deleteHandle);

function getAllHandler(request, response, next) {
  request.model.get()
    .then((results) => {
      response.json(results);
    })
    .catch(next);
}

function getOneHandler(request, response, next) {
  const data = request.body;
  request.model.post(data)
    .then((results) => response.json(results))
    .catch(next);
}

function postHandle(request, response, next) {
  const data = request.body;
  request.model.post(data)
    .then((results) => response.json(results))
    .catch(next);
}

function putHandle(request, response, next) {
  const { id } = request.params;
  const data = request.body;
  request.model.post(id, data)
    .then((results) => response.json(results))
    .catch(next);
}

function deleteHandle(request, response, next) {
  const { id } = request.params;
  request.model.delete(id)
    .then((result) => {
      console.log(result);
      response.status = 204;
    })
    .catch(next);
}

module.exports = router;
