const { registerUser } = require('../models/registerModel');

async function handleRegisterUser(req, res) {
    const { email, numEmployees } = req.body;

    try {
        const result = await registerUser(email, numEmployees);
        res.status(201).json({ success: true, message: 'User registered successfully', data: result });
    } catch (error) {
        console.error('Error during registration: ', error);
        res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
    }
}

module.exports = {
    handleRegisterUser
};
