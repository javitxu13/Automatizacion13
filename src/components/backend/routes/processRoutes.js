const express = require('express');
const router = express.Router();
const { addProcess, getProcesses, getProcessById } = require('../controllers/processController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/processes', authenticateToken, addProcess);
router.get('/processes', authenticateToken, getProcesses);
router.get('/processes/:id', authenticateToken, getProcessById);

module.exports = router;
