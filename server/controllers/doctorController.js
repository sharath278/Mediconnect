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
            userId: req.user._id,
            status: 'pending' // Default status
        });
        await newDoctor.save();

        res.status(201).json({
            success: true,
            message: 'Doctor account applied successfully',
        });
    } catch (error) {
        console.error('Error applying for doctor:', error);
        res.status(500).json({
            success: false,
            message: 'Error while applying for doctor',
            error: error.message
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
