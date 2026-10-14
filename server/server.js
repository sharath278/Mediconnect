const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables - check local server/.env and root .env
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Health Check Route for monitoring / cloud deployment
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Define Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// In production, serve the built frontend assets
if (process.env.NODE_ENV === 'production') {
    const clientDist = path.join(__dirname, '../client/dist');
    app.use(express.static(clientDist));

    app.use((req, res, next) => {
        if (req.method === 'GET' && !req.originalUrl.startsWith('/api')) {
            return res.sendFile(path.resolve(clientDist, 'index.html'));
        }
        next();
    });
} else {
    // Basic Route for testing in development
    app.get('/', (req, res) => {
        res.send('MediConnect API is running...');
    });
}

// 404 handler for API routes
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(404).json({ message: 'API endpoint not found' });
    }
    next();
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Server error:', err.stack || err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
