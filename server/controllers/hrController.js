




const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const Payroll = require('../models/Payroll');
const Grievance = require('../models/Grievance');
const Training = require('../models/Training');
const Task = require('../models/Task');

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('user');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employees', error: error.message });
  }
};

exports.manageEmployeeProfile = async (req, res) => {
  const { employeeId, designation, salary, emergencyContact } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      { designation, salary, emergencyContact },
      { new: true }
    );
    res.json({ message: 'Employee profile updated', employee });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update employee profile', error: error.message });
  }
};

exports.setEmployeeSalary = async (req, res) => {
  const { employeeId, salary } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      { salary },
      { new: true }
    );
    res.json({ message: 'Salary set successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Failed to set salary', error: error.message });
  }
};

exports.manageAttendance = async (req, res) => {
  const { employeeId, date, status, checkIn, checkOut } = req.body;

  try {
    const attendance = await Attendance.create({
      employee: employeeId,
      date,
      status,
      checkIn: checkIn ? new Date(checkIn) : null,
      checkOut: checkOut ? new Date(checkOut) : null,
    });
    res.json({ message: 'Attendance recorded', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Failed to record attendance', error: error.message });
  }
};

exports.processPayroll = async (req, res) => {
  const { employeeId, month, year, basicSalary, bonuses, deductions } = req.body;

  try {
    const netSalary = basicSalary + (bonuses || 0) - (deductions || 0);
    const payroll = await Payroll.findOneAndUpdate(
      { employee: employeeId, month, year },
      { basicSalary, bonuses, deductions, netSalary },
      { new: true, upsert: true }
    );
    res.json({ message: 'Payroll processed', payroll });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process payroll', error: error.message });
  }
};

exports.manageGrievance = async (req, res) => {
  const { grievanceId, status, resolvedBy } = req.body;

  try {
    const grievance = await Grievance.findByIdAndUpdate(
      grievanceId,
      { status, resolvedBy: resolvedBy || req.user.id },
      { new: true }
    );
    res.json({ message: 'Grievance updated', grievance });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update grievance', error: error.message });
  }
};

exports.scheduleTraining = async (req, res) => {
  const { title, description, date, employees } = req.body;

  try {
    const training = await Training.create({
      title,
      description,
      date: new Date(date),
      employees,
    });
    res.json({ message: 'Training scheduled', training });
  } catch (error) {
    res.status(500).json({ message: 'Failed to schedule training', error: error.message });
  }
};

exports.assignTask = async (req, res) => {
  const { title, description, assignedTo, dueDate } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      assignedTo,
      assignedBy: req.user.id,
      dueDate: new Date(dueDate),
    });
    res.json({ message: 'Task assigned', task });
  } catch (error) {
    res.status(500).json({ message: 'Failed to assign task', error: error.message });
  }
};

exports.performanceAppraisal = async (req, res) => {
  const { employeeId, rating, feedback } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      { $set: { 'performance.rating': rating, 'performance.feedback': feedback } },
      { new: true }
    );
    res.json({ message: 'Performance appraised', employee });
  } catch (error) {
    res.status(500).json({ message: 'Failed to appraise performance', error: error.message });
  }
};

exports.getLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await Attendance.find({ status: 'leave' })
      .populate({
        path: 'employee',
        populate: { path: 'user' },
      });

    const validLeaveRequests = leaveRequests.filter(
      (req) => req.employee && req.employee.user
    );

    res.json(validLeaveRequests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leave requests', error: error.message });
  }
};

exports.manageLeave = async (req, res) => {
  const { attendanceId, status } = req.body;

  try {
    const attendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      { status: status === 'approved' ? 'approved' : 'rejected' },
      { new: true }
    );
    res.json({ message: `Leave ${status} successfully`, attendance });
  } catch (error) {
    res.status(500).json({ message: `Failed to ${status} leave`, error: error.message });
  }
};

exports.getAssignedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedBy: req.user.id })
      .populate({
        path: 'assignedTo',
        populate: { path: 'user' },
      });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch assigned tasks', error: error.message });
  }
};