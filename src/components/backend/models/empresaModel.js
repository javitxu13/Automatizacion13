// models/empresaModel.js
const db = require('../config/dbConfig.js');

function saveEmpresaDetails(companyName, industry, phone) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO empresa_details (company_name, industry, phone) VALUES (?, ?, ?)';
        db.query(query, [companyName, industry, phone], (err, results) => {
            if (err) {
                console.error('Database query error: ', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

module.exports = {
    saveEmpresaDetails
};
