const db = require('../config/dbConfig.js');

const User = {
    getAll: (callback) => {
        db.query('SELECT * FROM users', callback);
    }
};

module.exports = User;