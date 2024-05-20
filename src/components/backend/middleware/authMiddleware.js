const admin = require('../firebaseAdmin');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // No autorizado
    }

    admin.auth().verifyIdToken(token)
        .then(decodedToken => {
            req.userId = decodedToken.uid;
            next();
        })
        .catch(error => {
            console.error('Error verifying token:', error);
            res.sendStatus(403); // Prohibido
        });
};

module.exports = authenticateToken;
