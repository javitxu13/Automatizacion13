// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { handleSubmitForm } = require('../controllers/rolController');

// Ruta para manejar el envío del formulario
router.post('/user-details/submit-form', handleSubmitForm);

module.exports = router;