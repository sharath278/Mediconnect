const express = require('express');
const router = express.Router();
const { getAllUsers, getAllDoctorsAdmin, approveDoctor } = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');

// Middleware to check if user is admin
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as admin' });
    }
};

router.get('/users', protect, adminMiddleware, getAllUsers);
router.get('/doctors', protect, adminMiddleware, getAllDoctorsAdmin);
router.put('/approve-doctor', protect, adminMiddleware, approveDoctor);

const { addDoctor, updateDoctor, deleteDoctor } = require('../controllers/adminController');
router.post('/add-doctor', protect, adminMiddleware, addDoctor);
router.put('/update-doctor/:id', protect, adminMiddleware, updateDoctor);
router.delete('/delete-doctor/:id', protect, adminMiddleware, deleteDoctor);

module.exports = router;
