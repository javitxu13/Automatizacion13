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

module.exports = {
    saveUser
};
