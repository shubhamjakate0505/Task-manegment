require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const User=require("./modules/userSchema")
const TeamLead=require("./modules/Teamlead")

const path=require("path")

const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// 1.create Team
app.post("/createTeam", async (req, res) => {
  try {
    const { teamName, teamLeaderId, employees } = req.body;
    if (!teamName || !teamLeaderId || !employees || !Array.isArray(employees)) {
      return res.status(400).json({ message: 'Invalid input' });
    }
    const team = new TeamLead({ teamName, teamLeaderId, employees });
    await team.save();  
    await User.updateMany(
      { _id: { $in: [teamLeaderId, ...employees] } },
      { $set: { teamId: team._id } }
    );
    res.status(201).json({ message: 'Team created successfully', team });
  } catch (error) {
    res.status(500).json({ message: 'Error creating team', error: error.message });
  }
});

/* // 2.Assige team teamLeaderId
app.post('/assignTeamLeader', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await User.findByIdAndUpdate(userId, { role: 'team_leader' }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Team leader assigned successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning team leader', error: error.message });
  }
}); */
app.post('/promoteToTeamLead', async (req, res) => {
  try {
    const { employeeId } = req.body;

    // Check if the employee ID is provided
    if (!employeeId) {
      return res.status(400).json({ message: 'Employee ID is required' });
    }

    // Find the employee and promote to team lead
    const employee = await User.findByIdAndUpdate(
      employeeId,
      { role: 'team_leader' }, // Change role to 'team_leader'
      { new: true } // Return the updated document
    );

    // If the employee does not exist
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee promoted to Team Lead successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error promoting employee to Team Lead', error: error.message });
  }
});


// 3.View Employee
app.get('/employees', async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' });
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
});


// Render admin dashboard
app.get('/admin', (req, res) => {
  res.render('dashboard');
});

// Render create team page
app.get('/createTeam', (req, res) => {
  res.render('create-team');
});

// Render assign team leader page
app.get('/assignTeamLeader', (req, res) => {
  res.render('assign-teamlead');
});

// Render view employees page
app.get('/viewEmployees', async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' });
    res.render('view-employee', { employees });
  } catch (error) {
    res.status(500).send('Error fetching employees');
  }
});


/* app.get("/",(req,res)=>{  
  res.render('Admin-dashboard')
})
 */app.get("*",(req,res)=>{
  res.send("Invalide Page")
})


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
