// routes/empresaRoutes.js
const express = require('express');
const router = express.Router();
const { handleSubmitEmpresaForm } = require('../controllers/empresaController');

// Ruta para manejar el envío del formulario de empresa
router.post('/empresa/submit', handleSubmitEmpresaForm);

module.exports = router;
