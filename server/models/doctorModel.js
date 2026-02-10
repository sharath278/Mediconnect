const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    feesPerCunsultation: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    timings: {
        type: Object,
        required: true // e.g., { "Monday": "10:00 - 12:00", "Tuesday": "14:00 - 16:00" }
    },
    hospital: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending' // pending, approved
    }
}, {
    timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
