// models/userModel.js
const db = require('../config/dbConfig.js');

function saveUser(userData) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO usersfinish (first_name, last_name, email, role, num_employees, company_name, industry, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            userData.firstName, userData.lastName, userData.email, userData.role,
            userData.numEmployees, userData.companyName, userData.industry, userData.phone
        ];
        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Database query error: ', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function saveProcess(processData) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO processes (name, type, department, tools, responsible, collaborators, objective, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            processData.name, processData.type, processData.department, JSON.stringify(processData.tools),
            processData.responsible, JSON.stringify(processData.collaborators), processData.objective, processData.user_id
        ];
        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Database query error: ', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function saveDepartment(departmentData) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO departments (name) VALUES (?)';
        db.query(query, [departmentData.name], (err, results) => {
            if (err) {
                console.error('Database query error: ', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

function addUserToDepartment(departmentId, userId) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO department_users (department_id, user_id) VALUES (?, ?)';
        db.query(query, [departmentId, userId], (err, results) => {
            if (err) {
                console.error('Database query error: ', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    saveUser,
    saveProcess,
    saveDepartment,
    addUserToDepartment
};
