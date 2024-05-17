// controllers/empresaController.js
const { saveEmpresaDetails } = require('../models/empresaModel');

async function handleSubmitEmpresaForm(req, res) {
    const { companyName, industry, phone } = req.body;

    try {
        const result = await saveEmpresaDetails(companyName, industry, phone);
        res.status(201).json({ success: true, message: 'Empresa details saved successfully', data: result });
    } catch (error) {
        console.error('Error saving empresa details: ', error);
        res.status(500).json({ success: false, message: 'Failed to save empresa details', error: error.message });
    }
}

module.exports = {
    handleSubmitEmpresaForm
};
