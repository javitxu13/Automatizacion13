// controllers/userController.js
const { saveUser } = require('../models/userModel');

async function handleSubmitForm(req, res) {
    const { firstName, lastName, email, role, numEmployees, companyName, industry, phone } = req.body;

    try {
        const result = await saveUser({ firstName, lastName, email, role, numEmployees, companyName, industry, phone });
        res.status(201).json({ success: true, message: 'User details saved successfully', data: result });
    } catch (error) {
        console.error('Error saving user details:', error);
        res.status(500).json({ success: false, message: 'Failed to save user details', error: error.message });
    }
}

module.exports = {
    handleSubmitForm
};
