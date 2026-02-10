const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');

// @desc    Apply for doctor account (Create Doctor Profile)
// @route   POST /api/doctors/apply
// @access  Private
const applyDoctor = async (req, res) => {
    try {
        const { name, specialization, experience, feesPerCunsultation, phone, timings, hospital, address } = req.body;

        // Basic validation
        if (!name || !specialization || !experience || !feesPerCunsultation || !phone || !timings || !hospital || !address) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const newDoctor = new Doctor({
            ...req.body,
            status: 'pending' // Default status
        });
        await newDoctor.save();

        // Update user role to indicate they have applied? 
        // Or just keep them as 'doctor' role but check doctorModel status.

        // Let's verify if the User indeed exists as 'doctor' role or if we should switch it.
        // For simplicity, we assume the user registered as a doctor role user.

        const adminUser = await User.findOne({ role: 'admin' });
        // In a real app, send notification to admin

        res.status(201).json({
            success: true,
            message: 'Doctor account applied successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while applying for doctor',
            error
        });
    }
};

// @desc    Get all approved doctors
// @route   GET /api/doctors/
// @access  Public
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({ status: 'approved' });
        res.status(200).json({
            success: true,
            data: doctors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while fetching doctors',
            error
        });
    }
};

module.exports = {
    applyDoctor,
    getAllDoctors
};
