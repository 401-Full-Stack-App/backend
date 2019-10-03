'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'DRAGON'; 

// what data or functionality does our User model need? 

const user = mongoose.Schema({
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
// bearer auth
user.statics.authenticateToken = function (token) {
  try {
    const parsedToken = jwt.verify(token, SECRET);
    const query = { _id: parsedToken.id };
    return this.findOne(query);
  } catch (error) { throw new Error('Token is Invalid :('); }
}; 

// basic auth
user.statics.authenticateBasic = function (auth) {
  const query = { username: auth.username };
  return this.findOne(query)
    // eslint-disable-next-line no-shadow
    .then((user) => user && user.comparePassword(auth.password))
    .catch((error) => { throw error; });
}; 

user.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
    .then((valid) => (valid ? this : null)); 
};

// generating Tokens
user.methods.generateToken = function (type) {
  const token = {
    id: this._id,
    capabilities: capabilities[this.role],
    type: type || 'user',
  }; 
  return jwt.sign(token, SECRET); 
}; 

// user role capabilities (does it exist?)
user.methods.can = function (capability) {
  return capabilities[this.role].includes(capability);
}; 


module.exports = mongoose.model('User', user); 
