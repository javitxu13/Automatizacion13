const db = require('../config/dbConfig.js');

const Department = {
    getAll: (callback) => {
        const query = `
            SELECT d.id as department_id, d.name as department_name, u.id as user_id, u.name as user_name
            FROM departments d
            LEFT JOIN department_users du ON d.id = du.department_id
            LEFT JOIN users u ON du.user_id = u.id
        `;
        db.query(query, callback);
    },

    create: (name, callback) => {
        db.query('INSERT INTO departments (name) VALUES (?)', [name], callback);
    },

    addUser: (departmentId, userId, callback) => {
        db.query('INSERT INTO department_users (department_id, user_id) VALUES (?, ?)', [departmentId, userId], callback);
    }
};

module.exports = Department;