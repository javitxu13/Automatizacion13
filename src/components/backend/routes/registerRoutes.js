const express = require('express');
const router = express.Router();
const { handleRegisterUser } = require('../controllers/registerController');

// Route to handle user registration
router.post('/register', handleRegisterUser);

module.exports = router;
