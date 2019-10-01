'use strict';

// config and start a server

require('dotenv').config();
const mongoose = require('mongoose');


const mongooseOptions = {
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
ServiceWorkerRegistration.start();
