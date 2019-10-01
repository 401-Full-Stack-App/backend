'use strict';

// handle per request, what logic to run 

const express = require('express');

const authRouter = express.Router(); 

const User = require('../model/user/schema.js');

const auth = require('../middleware/auth.js');

router.post('/signup', (request, response, next) => {
  const user = new User(request.body);
  user.save()
    .then((user) => {
      request.token = user.generateToken();
      request.user = user;
      response.set('token', request.token);
      response.cookie('auth', request.token);
      response.send(request.token);
    })  
    .catch(next);
});

// modifying the response object 
router.post('/signin', auth(), (request, response, next) => {
  response.set('token', request.token);
  response.cookie('auth', request.token);
  response.send(request.token);
});

module.exports = router; 
