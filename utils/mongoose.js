const { error } = require('console');
const mongoose = require('mongoose');
const { MONGO_URI } = require('../constants');

mongoose.connect(MONGO_URI, (error) => {
  if (error) {
    console.log('mongo error');
    console.log(error);
    process.exit(1);
  }
  console.log('mongo db connected');
});
