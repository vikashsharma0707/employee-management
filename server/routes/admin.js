const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, restrictTo } = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.use(restrictTo('admin'));

router.get('/employees', adminController.getAllEmployees);
router.put('/employee', adminController.updateEmployee);
router.delete('/employee/:userId', adminController.deleteEmployee);
router.post('/salary', adminController.defineSalaryStructure);
router.get('/reports', adminController.getReports);
router.post('/policy', adminController.createPolicy);

module.exports = router;