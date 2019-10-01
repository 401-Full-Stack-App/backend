'use strict';

// handle per request, what logic to run 

const express = require('express');

const authRouter = express.Router(); 

const User = require('../model/user/schema.js');

const auth = require('../middleware/auth.js');

authRouter.post('/signup', (request, response, next) => {
  const user = new User(request.body);
  user.save()
    // eslint-disable-next-line no-shadow
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
authRouter.post('/signin', auth(), (request, response) => {
  response.set('token', request.token);
  response.cookie('auth', request.token);
  response.send(request.token);
});

module.exports = authRouter; 
