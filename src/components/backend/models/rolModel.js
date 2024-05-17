// models/userModel.js
const db = require('../config/dbConfig.js');

function saveUserDetails(firstName, lastName, role) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO user_details (first_name, last_name, role) VALUES (?, ?, ?)';
        db.query(query, [firstName, lastName, role], (err, results) => {
            if (err) {
                console.error('Database query error: ', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    saveUserDetails
};