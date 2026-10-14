const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching users', error });
    }
};

// @desc    Get all doctors (including pending)
// @route   GET /api/admin/doctors
// @access  Private (Admin)
const getAllDoctorsAdmin = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.status(200).json({ success: true, data: doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching doctors', error });
    }
};

// @desc    Approve doctor account
// @route   PUT /api/admin/approve-doctor
// @access  Private (Admin)
const approveDoctor = async (req, res) => {
    try {
        const { doctorId, status } = req.body;
        const doctor = await Doctor.findByIdAndUpdate(doctorId, { status }, { new: true });

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        if (doctor.userId && status === 'approved') {
            const user = await User.findById(doctor.userId);
            if (user) {
                user.role = 'doctor';
                await user.save();
            }
        }

        res.status(200).json({
            success: true,
            message: 'Doctor status updated',
            data: doctor
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error approving doctor', error: error.message });
    }
};



// @desc    Add a new doctor (Create User + Doctor)
// @route   POST /api/admin/add-doctor
// @access  Private (Admin)
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, specialization, experience, feesPerCunsultation, phone, timings, hospital, address } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create User
        const user = await User.create({
            name,
            email,
            password,
            role: 'doctor' // Auto-assign doctor role
        });

        if (user) {
            // Create Doctor Profile
            const doctor = await Doctor.create({
                userId: user._id,
                name,
                specialization,
                experience,
                feesPerCunsultation,
                phone,
                timings,
                hospital,
                address,
                status: 'approved' // Auto-approve
            });

            res.status(201).json({
                success: true,
                message: 'Doctor added successfully',
                data: doctor
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding doctor', error });
    }
};

// @desc    Update doctor details
// @route   PUT /api/admin/update-doctor/:id
// @access  Private (Admin)
const updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, message: 'Doctor updated', data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating doctor', error });
    }
};

// @desc    Delete doctor
// @route   DELETE /api/admin/delete-doctor/:id
// @access  Private (Admin)
const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (doctor) {
            if (doctor.userId) {
                await User.findByIdAndDelete(doctor.userId);
            }
            await doctor.deleteOne();
            res.status(200).json({ success: true, message: 'Doctor deleted' });
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting doctor', error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getAllDoctorsAdmin,
    approveDoctor,
    addDoctor,
    updateDoctor,
    deleteDoctor
};
