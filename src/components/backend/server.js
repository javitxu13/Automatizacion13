// src/components/backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const registerRoutes = require('./routes/registerRoutes');
const rolRoutes = require('./routes/rolRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const processRoutes = require('./routes/processRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const userRoutes = require('./routes/userOrganizationRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', registerRoutes);
app.use('/api', rolRoutes);
app.use('/api', empresaRoutes);
app.use('/api', processRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api', authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Not Found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export the app for testing