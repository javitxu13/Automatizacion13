// src/controllers/authController.js
const db = require('../config/dbConfig.js');
const { sendMail } = require('../utils/email');

exports.registerUser = (req, res) => {
    const { email, num_empleados } = req.body;

    const usuario = { email, num_empleados, created_at: new Date() };
    const query = 'INSERT INTO users SET ?';

    db.query(query, usuario, (err, result) => {
        if (err) throw err;
        res.json({ userId: result.insertId });
    });
};

exports.addUserDetails = (req, res) => {
    const { first_name, last_name, role, userId } = req.body;

    const userDetails = { first_name, last_name, role, user_id: userId };
    const query = 'INSERT INTO user_details SET ?';

    db.query(query, userDetails, (err, result) => {
        if (err) throw err;
        res.json({ message: 'Detalles del usuario agregados' });
    });
};

exports.addCompanyDetails = (req, res) => {
    const { company_name, industry, phone, userId } = req.body;

    const companyDetails = { company_name, industry, phone };
    const query = 'INSERT INTO empresa_details SET ?';

    db.query(query, companyDetails, (err, result) => {
        if (err) throw err;
        
        const empresaId = result.insertId;
        const updateUserQuery = 'UPDATE user_details SET empresa_id = ? WHERE user_id = ?';
        
        db.query(updateUserQuery, [empresaId, userId], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Detalles de la empresa agregados' });
        });
    });
};

exports.sendConfirmationEmail = (req, res) => {
    const { email } = req.body;
    const token = generateToken(); // Implementa la generación de tokens

    sendMail(email, 'Configura tu contraseña', `Haz clic en el enlace para establecer tu contraseña: http://localhost:3000/establecer-contraseña?token=${token}`)
        .then(() => res.json({ message: 'Correo de confirmación enviado' }))
        .catch(err => console.error('Error enviando el correo:', err));
};

exports.setPassword = (req, res) => {
    const { token, password } = req.body;

    // Verifica el token y obtén el usuario asociado
    const hashedPassword = hashPassword(password); // Implementa el hashing de la contraseña

    const query = 'UPDATE users SET password = ? WHERE email = (SELECT email FROM user_details WHERE token = ?)';
    
    db.query(query, [hashedPassword, token], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Contraseña establecida correctamente' });
    });
};

function generateToken() {
    // Implementa la lógica de generación de tokens (por ejemplo, usando JWT o UUID)
    return 'token-generado';
}

function hashPassword(password) {
    // Implementa la lógica de hashing de contraseñas (por ejemplo, usando bcrypt)
    return 'contraseña-hasheada';
}
