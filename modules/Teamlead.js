const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Team schema
const teamSchema = new Schema({
  teamName: {
    type: String,
    required: true
  },
  teamLeaderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference to the Users collection (Team Leader)
    required: true
  },
  employees: [{
    type: Schema.Types.ObjectId,
    ref: 'User'  // Reference to the Users collection (Employees)
  }]
});

// Create Team model
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
