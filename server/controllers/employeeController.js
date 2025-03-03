


const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const Payroll = require('../models/Payroll');
const Policy = require('../models/Policy');
const Grievance = require('../models/Grievance');
const Task = require('../models/Task');

exports.updateProfile = async (req, res) => {
  const { emergencyContact } = req.body;

  try {
    const employee = await Employee.findOneAndUpdate(
      { user: req.user.id },
      { emergencyContact },
      { new: true }
    );
    res.json({ message: 'Profile updated', employee });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};

exports.markAttendance = async (req, res) => {
  const { date, status, checkIn, checkOut } = req.body;

  try {
    const employee = await Employee.findOne({ user: req.user.id });
    const attendance = await Attendance.create({
      employee: employee._id,
      date,
      status,
      checkIn: checkIn ? new Date(checkIn) : null,
      checkOut: checkOut ? new Date(checkOut) : null,
    });
    res.json({ message: 'Attendance marked', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark attendance', error: error.message });
  }
};

exports.applyLeave = async (req, res) => {
  const { date, status } = req.body;

  try {
    const employee = await Employee.findOne({ user: req.user.id });
    const attendance = await Attendance.create({
      employee: employee._id,
      date,
      status: 'leave',
    });
    res.json({ message: 'Leave applied', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Failed to apply leave', error: error.message });
  }
};

exports.getPayslips = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id });
    const payslips = await Payroll.find({ employee: employee._id });
    res.json(payslips);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payslips', error: error.message });
  }
};

exports.getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch policies', error: error.message });
  }
};

exports.submitGrievance = async (req, res) => {
  const { title, description } = req.body;

  try {
    const employee = await Employee.findOne({ user: req.user.id });
    const grievance = await Grievance.create({
      employee: employee._id,
      title,
      description,
    });
    res.json({ message: 'Grievance submitted', grievance });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit grievance', error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id });
    const tasks = await Task.find({ assignedTo: employee._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

exports.getLeaveRequests = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id });
    const leaveRequests = await Attendance.find({ employee: employee._id, status: { $in: ['leave', 'approved', 'rejected'] } });
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leave requests', error: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { taskId, status } = req.body;

  try {
    // Validate input
    if (!taskId || !status) {
      return res.status(400).json({ message: 'Task ID and status are required' });
    }

    // Ensure the status is valid
    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be one of: pending, in-progress, completed' });
    }

    // Find the employee
    const employee = await Employee.findOne({ user: req.user.id });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Find the task and ensure it belongs to the employee
    const task = await Task.findOne({ _id: taskId, assignedTo: employee._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not assigned to this employee' });
    }

    // Update the task status
    task.status = status;
    await task.save();

    res.json({ message: 'Task status updated successfully', task });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: 'Failed to update task status', error: error.message });
  }
};