const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskSchema = new Schema({
  taskName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    required: true
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Create Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
