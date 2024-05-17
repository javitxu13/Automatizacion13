const Department = require('../models/department');

exports.getAllDepartments = (req, res) => {
    Department.getAll((err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const departments = {};

            results.forEach(row => {
                if (!departments[row.department_id]) {
                    departments[row.department_id] = {
                        id: row.department_id,
                        name: row.department_name,
                        employees: []
                    };
                }
                if (row.user_id) {
                    departments[row.department_id].employees.push({
                        id: row.user_id,
                        name: row.user_name
                    });
                }
            });

            res.json(Object.values(departments)); // Devuelve un arreglo de departamentos
        }
    });
};

exports.createDepartment = (req, res) => {
    const { name } = req.body;
    Department.create(name, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ id: results.insertId, name });
        }
    });
};

exports.addUserToDepartment = (req, res) => {
    const { departmentId, userId } = req.body;
    Department.addUser(departmentId, userId, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
};
