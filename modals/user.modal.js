const mongoose = require('mongoose');
const { USER } = require('../constants');

const userModal = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: USER },
});

module.exports = new mongoose.model('User', userModal);
