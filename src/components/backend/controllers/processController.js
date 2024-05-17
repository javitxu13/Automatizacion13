const Process = require('../models/processModel');

const addProcess = (req, res) => {
    const processData = req.body;
    Process.create(processData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Process added successfully', id: result.insertId, ...processData });
    });
};

const getProcesses = (req, res) => {
    Process.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

module.exports = { addProcess, getProcesses };
