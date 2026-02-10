const mongoose = require('mongoose');

// MongoDB Connection URI provided by the user
// mongodb+srv://medi_connect:sharath23@homeheaven2.b4zqa.mongodb.net/?appName=HomeHeaven2
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://medi_connect:sharath23@homeheaven2.b4zqa.mongodb.net/?appName=HomeHeaven2');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
