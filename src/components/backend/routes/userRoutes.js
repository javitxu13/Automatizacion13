// routes/userRoutes.js
const express = require('express');
const { handleSubmitForm } = require('../controllers/userController');
const router = express.Router();

router.post('/submit-form', handleSubmitForm);

module.exports = router;
