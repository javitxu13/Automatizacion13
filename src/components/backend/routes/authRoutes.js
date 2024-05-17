// src/routes/authRoutes.js
const express = require('express');
const { registerUser, addUserDetails, addCompanyDetails, sendConfirmationEmail, setPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/registrar', registerUser);
router.post('/detalles-usuario', addUserDetails);
router.post('/detalles-empresa', addCompanyDetails);
router.post('/enviar-correo-confirmacion', sendConfirmationEmail);
router.post('/establecer-contraseña', setPassword);

module.exports = router;
