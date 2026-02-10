const express = require('express');
const router = express.Router();
const {
    bookAppointment,
    getMyAppointments,
    getDoctorAppointments,
    updateAppointmentStatus,
    getAllAppointments
} = require('../controllers/appointmentController');
const protect = require('../middleware/authMiddleware');

router.post('/book', protect, bookAppointment);
router.get('/my-appointments', protect, getMyAppointments);
router.get('/doctor-appointments', protect, getDoctorAppointments);

// @desc    Get all appointments (Admin)
// @route   GET /api/appointments/all
// @access  Private (Admin only)
router.get('/all', protect, getAllAppointments);

router.put('/status', protect, updateAppointmentStatus);

module.exports = router;
