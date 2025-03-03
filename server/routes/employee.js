// // // // // const express = require('express');
// // // // // const router = express.Router();
// // // // // const employeeController = require('../controllers/employeeController');
// // // // // const { authMiddleware, restrictTo } = require('../middleware/authMiddleware');

// // // // // router.use(authMiddleware);
// // // // // router.use(restrictTo('employee'));

// // // // // router.put('/profile', employeeController.updateProfile);
// // // // // router.post('/attendance', employeeController.markAttendance);
// // // // // router.post('/leave', employeeController.applyLeave);
// // // // // router.get('/payslips', employeeController.getPayslips);
// // // // // router.get('/policies', employeeController.getPolicies);
// // // // // router.post('/grievance', employeeController.submitGrievance);
// // // // // router.get('/tasks', employeeController.getTasks);
// // // // // router.get('/leave-requests', employeeController.getLeaveRequests);

// // // // // module.exports = router;



// // // // const express = require('express');
// // // // const router = express.Router();
// // // // const employeeController = require('../controllers/employeeController');
// // // // const { authMiddleware, restrictTo } = require('../middleware/authMiddleware');

// // // // router.use(authMiddleware);
// // // // router.use(restrictTo('employee'));

// // // // router.put('/profile', employeeController.updateProfile);
// // // // router.post('/attendance', employeeController.markAttendance);
// // // // router.post('/leave', employeeController.applyLeave);
// // // // router.get('/payslips', employeeController.getPayslips);
// // // // router.get('/policies', employeeController.getPolicies);
// // // // router.post('/grievance', employeeController.submitGrievance);
// // // // router.get('/tasks', employeeController.getTasks);
// // // // router.get('/leave-requests', employeeController.getLeaveRequests);
// // // // router.put('/task/status', employeeController.updateTaskStatus); // New route to update task status

// // // // module.exports = router;


// // // // const express = require('express');
// // // // const router = express.Router();
// // // // const employeeController = require('../controllers/employeeController');
// // // // const { authMiddleware, restrictTo } = require('../middleware/authMiddleware');

// // // // router.use(authMiddleware);
// // // // router.use(restrictTo('employee'));

// // // // router.put('/profile', employeeController.updateProfile);
// // // // router.post('/attendance', employeeController.markAttendance);
// // // // router.post('/leave', employeeController.applyLeave);
// // // // router.get('/payslips', employeeController.getPayslips);
// // // // router.get('/policies', employeeController.getPolicies);
// // // // router.post('/grievance', employeeController.submitGrievance);
// // // // router.get('/tasks', employeeController.getTasks);
// // // // router.get('/leave-requests', employeeController.getLeaveRequests);
// // // // router.put('/task/status', employeeController.updateTaskStatus); // Ensure this route exists

// // // // module.exports = router;





// // // const express = require('express');
// // // const router = express.Router();
// // // const employeeController = require('../controllers/employeeController');
// // // const { authMiddleware, restrictTo } = require('../middleware/authMiddleware');

// // // router.use(authMiddleware);
// // // router.use(restrictTo('employee'));

// // // router.put('/profile', employeeController.updateProfile);
// // // router.post('/attendance', employeeController.markAttendance);
// // // router.post('/leave', employeeController.applyLeave);
// // // router.get('/payslips', employeeController.getPayslips);
// // // router.get('/policies', employeeController.getPolicies);
// // // router.post('/grievance', employeeController.submitGrievance);
// // // router.get('/tasks', employeeController.getTasks);
// // // router.get('/leave-requests', employeeController.getLeaveRequests);
// // // router.put('/task/status', employeeController.updateTaskStatus); // Ensure this route exists

// // // module.exports = router;


// // const express = require('express');
// // const router = express.Router();
// // const employeeController = require('../controllers/employeeController');
// // const { authMiddleware, restrictTo } = require('../middleware/authMiddleware');

// // router.use(authMiddleware);
// // router.use(restrictTo('employee'));

// // router.put('/profile', employeeController.updateProfile);
// // router.post('/attendance', employeeController.markAttendance);
// // router.post('/leave', employeeController.applyLeave);
// // router.get('/payslips', employeeController.getPayslips);
// // router.get('/policies', employeeController.getPolicies);
// // router.post('/grievance', employeeController.submitGrievance);
// // router.get('/tasks', employeeController.getTasks);
// // router.get('/leave-requests', employeeController.getLeaveRequests);
// // router.put('/task/status', employeeController.updateTaskStatus); // Ensure this route exists

// // module.exports = router;



// const express = require('express');
// const router = express.Router();
// const employeeController = require('../controllers/employeeController');
// const { authMiddleware, restrictTo } = require('../middleware/authMiddleware');

// router.use(authMiddleware);
// router.use(restrictTo('employee'));

// router.put('/profile', employeeController.updateProfile);
// router.post('/attendance', employeeController.markAttendance);
// router.post('/leave', employeeController.applyLeave);
// router.get('/payslips', employeeController.getPayslips);
// router.get('/policies', employeeController.getPolicies);
// router.post('/grievance', employeeController.submitGrievance);
// router.get('/tasks', employeeController.getTasks);
// router.get('/leave-requests', employeeController.getLeaveRequests);
// router.put('/task/status', employeeController.updateTaskStatus);

// module.exports = router;



const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { authMiddleware, restrictTo } = require('../middleware/authMiddleware');

console.log('Setting up employee routes'); // Debug log

router.use(authMiddleware);
router.use(restrictTo('employee'));

router.put('/profile', employeeController.updateProfile);
router.post('/attendance', employeeController.markAttendance);
router.post('/leave', employeeController.applyLeave);
router.get('/payslips', employeeController.getPayslips);
router.get('/policies', employeeController.getPolicies);
router.post('/grievance', employeeController.submitGrievance);
router.get('/tasks', employeeController.getTasks);
router.get('/leave-requests', employeeController.getLeaveRequests);
router.put('/task/status', employeeController.updateTaskStatus);

module.exports = router;