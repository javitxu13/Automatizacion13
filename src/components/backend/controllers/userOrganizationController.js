const User = require('../models/userOrganization');

exports.getAllUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
};
