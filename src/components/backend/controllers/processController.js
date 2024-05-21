const Process = require('../models/processModel');

const addProcess = (req, res) => {
    const processData = { ...req.body, userId: req.userId };
    if (!Array.isArray(processData.tools)) {
        processData.tools = [processData.tools];
    }
    if (!Array.isArray(processData.collaborators)) {
        processData.collaborators = [processData.collaborators];
    }
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

const getProcessById = (req, res) => {
    const userId = req.userId;
    const processId = req.params.id;
    Process.getById(userId, processId, (err, process) => {
        if (err) {
            console.error('Error fetching process:', err);
            return res.status(500).json({ error: err.message });
        }
        if (!process) {
            return res.status(404).json({ error: 'Process not found' });
        }
        res.status(200).json(process);
    });
};

module.exports = { addProcess, getProcesses, getProcessById };
