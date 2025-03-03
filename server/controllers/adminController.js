const User = require('../models/User');
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const Payroll = require('../models/Payroll');
const Policy = require('../models/Policy');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('user');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employees', error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  const { userId, designation, salary, department } = req.body;

  try {
    const employee = await Employee.findOneAndUpdate(
      { user: userId },
      { designation, salary, department },
      { new: true, upsert: true }
    );
    res.json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update employee', error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { userId } = req.params;

  try {
    await Employee.deleteOne({ user: userId });
    await User.deleteOne({ _id: userId });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete employee', error: error.message });
  }
};

exports.defineSalaryStructure = async (req, res) => {
  const { employeeId, month, year, basicSalary, bonuses, deductions } = req.body;

  // Validate input
  if (!employeeId || !month || !year || !basicSalary) {
    return res.status(400).json({ message: 'Employee ID, month, year, and basic salary are required' });
  }

  if (isNaN(basicSalary) || (bonuses && isNaN(bonuses)) || (deductions && isNaN(deductions))) {
    return res.status(400).json({ message: 'Basic salary, bonuses, and deductions must be numbers' });
  }

  try {
    // Check if the employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const netSalary = parseFloat(basicSalary) + (parseFloat(bonuses) || 0) - (parseFloat(deductions) || 0);
    const payroll = await Payroll.create({
      employee: employeeId,
      month,
      year,
      basicSalary: parseFloat(basicSalary),
      bonuses: parseFloat(bonuses) || 0,
      deductions: parseFloat(deductions) || 0,
      netSalary,
    });
    res.json({ message: 'Salary structure defined', payroll });
  } catch (error) {
    console.error('Error defining salary structure:', error);
    res.status(500).json({ message: 'Failed to define salary structure', error: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('employee');
    const payroll = await Payroll.find().populate('employee');
    res.json({ attendance, payroll });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate reports', error: error.message });
  }
};

exports.createPolicy = async (req, res) => {
  const { title, description } = req.body;

  // Validate input
  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  // Ensure req.user is set by authMiddleware
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const policy = await Policy.create({
      title,
      description,
      createdBy: req.user.id,
    });
    res.json({ message: 'Policy created successfully', policy });
  } catch (error) {
    console.error('Error creating policy:', error);
    res.status(500).json({ message: 'Failed to create policy', error: error.message });
  }
};