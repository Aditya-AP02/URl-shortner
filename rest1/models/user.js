const mongoose = require("mongoose")

// User schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  },
  jobTitle: {
    type: String,
  }
}, {timestamps: true});

// User model (explicit 'users' collection)
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;