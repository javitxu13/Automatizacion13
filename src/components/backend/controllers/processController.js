const Process = require('../models/processModel');

const addProcess = (req, res) => {
    const processData = { ...req.body, userId: req.userId };
    Process.create(processData, (err, result) => {
        if (err) {
            console.error('Error adding process:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Process added successfully', id: result.insertId, ...processData });
    });
};

const getProcesses = (req, res) => {
    const userId = req.userId;
    Process.getAllByUser(userId, (err, results) => {
        if (err) {
            console.error('Error fetching processes:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

module.exports = { addProcess, getProcesses };
