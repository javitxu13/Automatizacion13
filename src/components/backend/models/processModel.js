const db = require('../config/dbConfig.js');

const Process = {
    create: (data, callback) => {
        const query = `INSERT INTO processes (name, type, department, tools, responsible, collaborators, objective) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            data.name,
            data.type,
            data.department,
            JSON.stringify(data.tools),
            data.responsible,
            JSON.stringify(data.collaborators),
            data.objective
        ];
        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    getAll: (callback) => {
        const query = `SELECT * FROM processes`;
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            const formattedResults = results.map(process => ({
                ...process,
                tools: JSON.parse(process.tools || '[]'),
                collaborators: JSON.parse(process.collaborators || '[]')
            }));
            callback(null, formattedResults);
        });
    }
};

module.exports = Process;