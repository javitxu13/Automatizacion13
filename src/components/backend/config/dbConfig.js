require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'javitxu13',
    password: process.env.DB_PASSWORD || 'tontito33',
    database: process.env.DB_DATABASE || 'automata'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL Database.');
});

module.exports = db;
