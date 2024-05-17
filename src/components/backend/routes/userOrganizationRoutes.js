const express = require('express');
const router = express.Router();
const userController = require('../controllers/userOrganizationController');

router.get('/', userController.getAllUsers);

module.exports = router;
