const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For hashing passwords
const User = require('./modules/userSchema');  // Assuming your User model is in './modules/userSchema'

mongoose.connect('mongodb://localhost/taskmanagement', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Sample user data
    const users = [
      {
        name: 'Alice Admin',
        email: 'alice.admin@example.com',
        password: await bcrypt.hash('admin123', 10),  // Hash the password
        role: 'admin'
      },
      {
        name: 'Bob TeamLeader',
        email: 'bob.teamleader@example.com',
        password: await bcrypt.hash('teamleader123', 10),  // Hash the password
        role: 'team_leader'
      },
      {
        name: 'Charlie Employee',
        email: 'charlie.employee@example.com',
        password: await bcrypt.hash('employee123', 10),  // Hash the password
        role: 'employee'
      },
      {
        name: 'David Employee',
        email: 'david.employee@example.com',
        password: await bcrypt.hash('employee123', 10),  // Hash the password
        role: 'employee'
      }
    ];

    // Insert users into the database
    try {
      const insertedUsers = await User.insertMany(users);
      console.log('Users inserted:', insertedUsers);
      mongoose.disconnect();  // Disconnect after all operations are done
    } catch (err) {
      console.error('Error inserting users:', err);
      mongoose.disconnect();
    }

  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
