// routes/userRoutes.js
const express = require('express');
const { handleSubmitForm, handleSubmitProcess, handleSubmitDepartment, handleAddUserToDepartment } = require('../controllers/userController');
const router = express.Router();

router.post('/submit-form', handleSubmitForm);
router.post('/submit-process', handleSubmitProcess);
router.post('/submit-department', handleSubmitDepartment);
router.post('/add-user-to-department', handleAddUserToDepartment);

module.exports = router;
