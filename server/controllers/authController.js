// // // // const User = require('../models/User');
// // // // const Employee = require('../models/Employee');
// // // // const bcrypt = require('bcryptjs');
// // // // const jwt = require('jsonwebtoken');

// // // // exports.register = async (req, res) => {
// // // //   const { name, email, password, role, designation, department } = req.body;
// // // //   const image = req.file ? req.file.path : null;

// // // //   try {
// // // //     const existingUser = await User.findOne({ email });
// // // //     if (existingUser) {
// // // //       return res.status(400).json({ message: 'User already exists' });
// // // //     }

// // // //     const hashedPassword = await bcrypt.hash(password, 10);
// // // //     const user = await User.create({
// // // //       name,
// // // //       email,
// // // //       password: hashedPassword,
// // // //       role,
// // // //       department,
// // // //     });

// // // //     if (role === 'employee') {
// // // //       await Employee.create({
// // // //         user: user._id,
// // // //         designation,
// // // //         salary: 0,
// // // //         department,
// // // //         image,
// // // //       });
// // // //     }

// // // //     res.status(201).json({ message: 'User registered successfully' });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Registration failed', error: error.message });
// // // //   }
// // // // };

// // // // exports.login = async (req, res) => {
// // // //   const { email, password } = req.body;

// // // //   try {
// // // //     const user = await User.findOne({ email });
// // // //     if (!user || !(await bcrypt.compare(password, user.password))) {
// // // //       return res.status(401).json({ message: 'Invalid credentials' });
// // // //     }

// // // //     const token = jwt.sign(
// // // //       { id: user._id, role: user.role },
// // // //       process.env.JWT_SECRET,
// // // //       { expiresIn: '1d' }
// // // //     );

// // // //     res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
// // // //   } catch (error) {
// // // //     res.status(500).json({ message: 'Login failed', error: error.message });
// // // //   }
// // // // };

// // // const User = require('../models/User');
// // // const Employee = require('../models/Employee');
// // // const bcrypt = require('bcryptjs');
// // // const jwt = require('jsonwebtoken');

// // // exports.register = async (req, res) => {
// // //   const { name, email, password, role, designation, department } = req.body;
// // //   const image = req.file ? req.file.path : null;

// // //   // Validate required fields
// // //   if (!name || !email || !password || !role) {
// // //     return res.status(400).json({ message: 'Name, email, password, and role are required' });
// // //   }

// // //   if (role === 'employee' && (!designation || !department)) {
// // //     return res.status(400).json({ message: 'Designation and department are required for employees' });
// // //   }

// // //   try {
// // //     const existingUser = await User.findOne({ email });
// // //     if (existingUser) {
// // //       return res.status(400).json({ message: 'User already exists' });
// // //     }

// // //     const hashedPassword = await bcrypt.hash(password, 10);
// // //     const user = await User.create({
// // //       name,
// // //       email,
// // //       password: hashedPassword,
// // //       role,
// // //       department,
// // //     });

// // //     if (role === 'employee') {
// // //       await Employee.create({
// // //         user: user._id,
// // //         designation,
// // //         salary: 0,
// // //         department,
// // //         image,
// // //       });
// // //     }

// // //     res.status(201).json({ message: 'User registered successfully' });
// // //   } catch (error) {
// // //     console.error('Registration error:', error);
// // //     res.status(500).json({ message: 'Registration failed', error: error.message });
// // //   }
// // // };

// // // exports.login = async (req, res) => {
// // //   const { email, password } = req.body;

// // //   try {
// // //     const user = await User.findOne({ email });
// // //     if (!user || !(await bcrypt.compare(password, user.password))) {
// // //       return res.status(401).json({ message: 'Invalid credentials' });
// // //     }

// // //     const token = jwt.sign(
// // //       { id: user._id, role: user.role },
// // //       process.env.JWT_SECRET,
// // //       { expiresIn: '1d' }
// // //     );

// // //     res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Login failed', error: error.message });
// // //   }
// // // };




// // const User = require('../models/User');
// // const Employee = require('../models/Employee');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');

// // exports.register = async (req, res) => {
// //   const { name, email, password, role, designation, department } = req.body;
// //   const image = req.file ? req.file.path : null;

// //   // Validate required fields
// //   if (!name || !email || !password || !role) {
// //     return res.status(400).json({ message: 'Name, email, password, and role are required' });
// //   }

// //   if (role === 'employee' && (!designation || !department)) {
// //     return res.status(400).json({ message: 'Designation and department are required for employees' });
// //   }

// //   try {
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'User already exists' });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const user = await User.create({
// //       name,
// //       email,
// //       password: hashedPassword,
// //       role,
// //       department,
// //     });

// //     if (role === 'employee') {
// //       await Employee.create({
// //         user: user._id,
// //         designation,
// //         salary: 0,
// //         department,
// //         image,
// //       });
// //     }

// //     res.status(201).json({ message: 'User registered successfully' });
// //   } catch (error) {
// //     console.error('Registration error:', error);
// //     res.status(500).json({ message: 'Registration failed', error: error.message });
// //   }
// // };

// // exports.login = async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user || !(await bcrypt.compare(password, user.password))) {
// //       return res.status(401).json({ message: 'Invalid credentials' });
// //     }

// //     const token = jwt.sign(
// //       { id: user._id, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: '1d' }
// //     );

// //     res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Login failed', error: error.message });
// //   }
// // };




// const User = require('../models/User');
// const Employee = require('../models/Employee');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   const { name, email, password, role, designation, department } = req.body;
//   const image = req.file ? req.file.path : null;

//   console.log('Received registration data:', { name, email, password, role, designation, department, image }); // Debug log

//   // Validate required fields
//   if (!name || !email || !password || !role) {
//     return res.status(400).json({ message: 'Name, email, password, and role are required' });
//   }

//   if (role === 'employee' && (!designation || !department)) {
//     return res.status(400).json({ message: 'Designation and department are required for employees' });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       department,
//     });

//     if (role === 'employee') {
//       await Employee.create({
//         user: user._id,
//         designation,
//         salary: 0,
//         department,
//         image,
//       });
//     }

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: 'Registration failed', error: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
//   } catch (error) {
//     res.status(500).json({ message: 'Login failed', error: error.message });
//   }
// };




const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, role, designation, department } = req.body;
  const image = req.file ? req.file.path : null;

  console.log('Received registration data:', { name, email, password, role, designation, department, imagePath: req.file?.path, file: req.file });

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Name, email, password, and role are required' });
  }

  if (role === 'employee' && (!designation || !department)) {
    return res.status(400).json({ message: 'Designation and department are required for employees' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      department,
    });

    if (role === 'employee') {
      const employee = await Employee.create({
        user: user._id,
        designation,
        salary: 0,
        department,
        image,
      });
      console.log('Created employee:', employee);
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};