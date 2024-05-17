const db = require('../config/dbConfig.js');

function registerUser(email, numEmployees) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (email, num_employees) VALUES (?, ?)';
        db.query(query, [email, numEmployees], (err, results) => {
            if (err) {
                console.error('Database query error: ', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    registerUser
};
