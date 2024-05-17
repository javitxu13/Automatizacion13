const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.get('/', departmentController.getAllDepartments);
router.post('/', departmentController.createDepartment);
router.post('/add-user', departmentController.addUserToDepartment);

module.exports = router;