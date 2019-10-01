'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'wyvern'; 

// what data or functionality does our User model need? 

const User = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['admin', 'editor', 'user'] },
});

const capabilities = {
  admin: ['create', 'read', 'update', 'delete'],
  editor: ['create', 'read', 'update'],
  user: ['create', 'read'],
};

// pre-hooks (what considerations whne making changes?)
user.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// What are our Auth needs? 

// Token Validation (is the token that is pass a User token?)
user.statics.authenticateToken = function(token) {

}

// basic auth
user.statics.authenticateBasic = function (auth) {
  let query = { username: auth.username };
  return this.findOne(query)
  .then(user => user && user.comparePassword(auth.password))
  .catch(error => {throw error; });
}; 

// bearer auth

// generating Tokens
user.statics.generateToken = function(token) {
  let token = {
    id: this._id,
    capabilities: capabilities[this.role],
    type: type || 

  }
}

// user role capabilities (does it exist?)
user.methods.can = function (capability) {
  return capabilities[this.role].includes(capability);
}; 


module.exports = mongoose.model('User', user); 
