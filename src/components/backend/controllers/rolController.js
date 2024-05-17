// controllers/userController.js
const { saveUserDetails } = require('../models/rolModel');

async function handleSubmitForm(req, res) {
    const { firstName, lastName, role } = req.body;

    try {
        const result = await saveUserDetails(firstName, lastName, role);
        res.status(201).json({ success: true, message: 'User details saved successfully', data: result });
    } catch (error) {
        console.error('Error saving user details: ', error);
        res.status(500).json({ success: false, message: 'Failed to save user details', error: error.message });
    }
}

module.exports = {
    handleSubmitForm
};