const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Doctor = require('./models/doctorModel');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        console.log('Clearing existing data...');
        await User.deleteMany();
        await Doctor.deleteMany();

        console.log('Creating Admin User...');
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@mediconnect.com',
            password: 'adminpassword', // Will be hashed by pre-save hook
            role: 'admin'
        });

        console.log('Creating Doctor User...');
        const doctorUser = await User.create({
            name: 'Dr. Smith',
            email: 'doctor@mediconnect.com',
            password: 'doctorpassword',
            role: 'doctor'
        });

        console.log('Creating Doctor Profile...');
        await Doctor.create({
            userId: doctorUser._id,
            name: 'Dr. John Smith',
            specialization: 'Cardiologist',
            experience: 15,
            feesPerCunsultation: 500,
            phone: '123-456-7890',
            timings: { "Mon-Fri": "09:00-17:00" },
            hospital: 'City Heart Center',
            address: '123 Medical Drive, Health City',
            status: 'approved'
        });

        console.log('Creating Patient User...');
        await User.create({
            name: 'John Doe',
            email: 'patient@mediconnect.com',
            password: 'patientpassword',
            role: 'patient'
        });

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error with data import:', error);
        process.exit(1);
    }
};

seedData();
