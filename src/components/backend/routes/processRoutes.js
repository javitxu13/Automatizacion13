const express = require('express');
const router = express.Router();
const { addProcess, getProcesses } = require('../controllers/processController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/processes', authenticateToken, addProcess);
router.get('/processes', authenticateToken, getProcesses);

module.exports = router;
