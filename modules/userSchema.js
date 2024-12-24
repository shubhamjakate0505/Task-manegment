const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'team_leader', 'employee'],
    required: true
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Teams',  // Reference to the Teams collection
    required: false
  }
});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
