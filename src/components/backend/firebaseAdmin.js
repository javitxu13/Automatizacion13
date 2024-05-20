const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://automatizacion-e8a37.firebaseio.com' // Reemplaza con el ID de tu proyecto
});

module.exports = admin;
