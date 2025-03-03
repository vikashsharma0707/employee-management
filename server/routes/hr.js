// const express = require('express');
// const router = express.Router();
// const hrController = require('../controllers/hrController');
// const { authMiddleware, restrictTo } = require('../middleware/authMiddleware');

// router.use(authMiddleware);
// router.use(restrictTo('hr'));

// router.get('/employees', hrController.getEmployees);
// router.put('/employee', hrController.manageEmployeeProfile);
// router.put('/set-salary', hrController.setEmployeeSalary);
// router.post('/attendance', hrController.manageAttendance);
// router.post('/payroll', hrController.processPayroll);
// router.put('/grievance', hrController.manageGrievance);
// router.post('/training', hrController.scheduleTraining);
// router.post('/task', hrController.assignTask);
// router.post('/appraisal', hrController.performanceAppraisal);
// router.get('/leave-requests', hrController.getLeaveRequests);
// router.put('/leave', hrController.manageLeave);

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const hrController = require('../controllers/hrController');
// const { authMiddleware, restrictTo } = require('../middleware/authMiddleware');

// router.use(authMiddleware);
// router.use(restrictTo('hr'));

// router.get('/employees', hrController.getEmployees);
// router.put('/employee', hrController.manageEmployeeProfile);
// router.put('/set-salary', hrController.setEmployeeSalary);
// router.post('/attendance', hrController.manageAttendance);
// router.post('/payroll', hrController.processPayroll);
// router.put('/grievance', hrController.manageGrievance);
// router.post('/training', hrController.scheduleTraining);
// router.post('/task', hrController.assignTask);
// router.post('/appraisal', hrController.performanceAppraisal);
// router.get('/leave-requests', hrController.getLeaveRequests);
// router.put('/leave', hrController.manageLeave);
// router.get('/assigned-tasks', hrController.getAssignedTasks); // New route to fetch assigned tasks

// module.exports = router;



const express = require('express');
const router = express.Router();
const hrController = require('../controllers/hrController');
const { authMiddleware, restrictTo } = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.use(restrictTo('hr'));

router.get('/employees', hrController.getEmployees);
router.put('/employee', hrController.manageEmployeeProfile);
router.put('/set-salary', hrController.setEmployeeSalary);
router.post('/attendance', hrController.manageAttendance);
router.post('/payroll', hrController.processPayroll);
router.put('/grievance', hrController.manageGrievance);
router.post('/training', hrController.scheduleTraining);
router.post('/task', hrController.assignTask);
router.post('/appraisal', hrController.performanceAppraisal);
router.get('/leave-requests', hrController.getLeaveRequests);
router.put('/leave', hrController.manageLeave);
router.get('/assigned-tasks', hrController.getAssignedTasks); // Ensure this route exists

module.exports = router;