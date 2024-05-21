const db = require('../config/dbConfig');

const Process = {
    create: (data, callback) => {
        const query = `INSERT INTO processes (userId, name, type, department, tools, responsible, collaborators, objective, status, priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            data.userId,
            data.name,
            data.type,
            data.department,
            JSON.stringify(data.tools),
            data.responsible,
            JSON.stringify(data.collaborators),
            data.objective,
            data.status || 'active',
            data.priority || 'medium'
        ];
        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    getAllByUser: (userId, callback) => {
        const query = `SELECT * FROM processes WHERE userId = ?`;
        db.query(query, [userId], (err, results) => {
            if (err) {
                return callback(err);
            }
            const formattedResults = results.map(process => {
                let tools, collaborators;
                try {
                    tools = JSON.parse(process.tools);
                } catch (error) {
                    console.error('Error parsing tools JSON:', error);
                    tools = process.tools;
                }
                try {
                    collaborators = JSON.parse(process.collaborators);
                } catch (error) {
                    console.error('Error parsing collaborators JSON:', error);
                    collaborators = process.collaborators;
                }
                return {
                    ...process,
                    tools,
                    collaborators
                };
            });
            callback(null, formattedResults);
        });
    },

    getById: (userId, processId, callback) => {
        const query = `SELECT * FROM processes WHERE userId = ? AND id = ?`;
        db.query(query, [userId, processId], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, null);
            }
            const process = results[0];
            try {
                process.tools = JSON.parse(process.tools);
            } catch (error) {
                console.error('Error parsing tools JSON:', error);
                process.tools = process.tools;
            }
            try {
                process.collaborators = JSON.parse(process.collaborators);
            } catch (error) {
                console.error('Error parsing collaborators JSON:', error);
                process.collaborators = process.collaborators;
            }
            callback(null, process);
        });
    }
};

module.exports = Process;
