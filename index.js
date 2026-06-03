const express = require('express');
require('dotenv').config();
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Middleware
app.use(express.json());

// Main Router API Mounting point
app.use('/api', profileRoutes);

// Global fallback handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ success: false, error: "API Route endpoint not found." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server actively running on port ${PORT}`);
});