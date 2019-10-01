/* eslint-disable no-use-before-define */

'use strict';

// intercepts requests that need to be authenticated, sits between requests and checks auth headers
// checks for auth credentials 

const User = require('../model/user/schema.js');

module.exports = (capability) => {
  // check for basic or bearer auth

  // eslint-disable-next-line consistent-return
  return (request, response, next) => {
    try {
      const [authType, authString] = request.headers.authorization.split(/\s+/);
  
      switch (authType.toLowerCase()) {
        case 'basic':
          return _authBasic(authString);
        case 'bearer':
          return _authBearer(authString);
        default: 
          return _authError();
      }
    } catch (error) {
      _authError(error);
    }
        
    function _authBasic(string) {
      const base64Buffer = Buffer.from(string, 'base64');
      const bufferString = base64Buffer.toString();
      const [username, password] = bufferString.split(':');
      const auth = { username, password };
          
      return User.authenticateBsic(auth)
        .then((user) => _authenticate(user))
        .catch(_authError);
    }
  
    function _authBearer(authString) {
      return User.authenticateToken(authString)
        .then((user) => _authenticate(user))
        .catch(_authError);
    }
  
    function _authenticate(user) {
      if (user && (!capability || user.can(capability))) {
        request.user = user;
        request.token = user.generateToken();
        next();
      } else {
        _authError();
      }
    }
  
    function _authError() {
      next('User Id or Password is Incorrect'); 
    }
  };
};
