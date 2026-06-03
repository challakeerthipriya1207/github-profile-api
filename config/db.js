const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306, // <-- Tells it to look for Aiven's custom port
    ssl: {
        rejectUnauthorized: false // <-- Enables the required SSL encryption for cloud databases
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection()
    .then(() => console.log("Database pool initialized successfully."))
    .catch((err) => {
        console.error("❌ Database initialization failed:", err.message);
    });

module.exports = db;