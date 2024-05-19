// controllers/userController.js
const { saveUser, saveProcess, saveDepartment, addUserToDepartment } = require('../models/userModel');

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

async function handleSubmitProcess(req, res) {
    const { name, type, department, tools, responsible, collaborators, objective, user_id } = req.body;

    try {
        const result = await saveProcess({ name, type, department, tools, responsible, collaborators, objective, user_id });
        res.status(201).json({ success: true, message: 'Process saved successfully', data: result });
    } catch (error) {
        console.error('Error saving process:', error);
        res.status(500).json({ success: false, message: 'Failed to save process', error: error.message });
    }
}

async function handleSubmitDepartment(req, res) {
    const { name } = req.body;

    try {
        const result = await saveDepartment({ name });
        res.status(201).json({ success: true, message: 'Department saved successfully', data: result });
    } catch (error) {
        console.error('Error saving department:', error);
        res.status(500).json({ success: false, message: 'Failed to save department', error: error.message });
    }
}

async function handleAddUserToDepartment(req, res) {
    const { departmentId, userId } = req.body;

    try {
        const result = await addUserToDepartment(departmentId, userId);
        res.status(201).json({ success: true, message: 'User added to department successfully', data: result });
    } catch (error) {
        console.error('Error adding user to department:', error);
        res.status(500).json({ success: false, message: 'Failed to add user to department', error: error.message });
    }
}

module.exports = {
    handleSubmitForm,
    handleSubmitProcess,
    handleSubmitDepartment,
    handleAddUserToDepartment
};
