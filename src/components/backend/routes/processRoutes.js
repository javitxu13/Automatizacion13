const express = require('express');
const router = express.Router();
const { addProcess, getProcesses } = require('../controllers/processController');

router.post('/processes', addProcess);
router.get('/processes', getProcesses);

module.exports = router;
