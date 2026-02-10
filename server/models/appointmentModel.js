const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    doctorInfo: {
        type: String,
        required: false // Store minimal doc info or populate
    },
    userInfo: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    problemDescription: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: 'pending' // pending, approved, rejected, completed
    }
}, {
    timestamps: true
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
