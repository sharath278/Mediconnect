const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');

// @desc    Book an appointment
// @route   POST /api/appointments
// @access  Private
const bookAppointment = async (req, res) => {
    try {
        const { doctorId, date, time } = req.body;
        // Check if doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const newAppointment = new Appointment({
            userId: req.user._id,
            doctorId,
            doctorInfo: doctor.name + ' - ' + doctor.specialization,
            userInfo: req.user.name,
            date,
            time,
            problemDescription: req.body.problemDescription,
            status: 'pending'
        });

        await newAppointment.save();

        res.status(200).json({
            success: true,
            message: 'Appointment booked successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error creating appointment',
            error
        });
    }
};

// @desc    Get user appointments
// @route   GET /api/appointments/my-appointments
// @access  Private
const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user._id });
        res.status(200).json({
            success: true,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching appointments',
            error
        });
    }
};

// @desc    Get doctor appointments
// @route   GET /api/appointments/doctor-appointments
// @access  Private (Doctor only)
const getDoctorAppointments = async (req, res) => {
    try {
        // First find the doctor profile for this user
        const doctor = await Doctor.findOne({ userId: req.user._id });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor profile not found' });
        }

        const appointments = await Appointment.find({ doctorId: doctor._id });
        res.status(200).json({
            success: true,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching appointments',
            error
        });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/status
// @access  Private (Doctor/Admin)
const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status }, { new: true });

        res.status(200).json({
            success: true,
            message: 'Appointment status updated',
            data: appointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating status',
            error
        });
    }
};

// @desc    Get all appointments (Admin)
// @route   GET /api/appointments/all
// @access  Private (Admin only)
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching all appointments',
            error
        });
    }
};

module.exports = {
    bookAppointment,
    getMyAppointments,
    getDoctorAppointments,
    updateAppointmentStatus,
    getAllAppointments
};
