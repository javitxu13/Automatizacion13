const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const processRoutes = require('./routes/processRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const userOrganizationRoutes = require('./routes/userOrganizationRoutes');
const authRoutes = require('./routes/authRoutes');
const admin = require('./firebaseAdmin');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', processRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/users', userOrganizationRoutes);
app.use('/api', authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
