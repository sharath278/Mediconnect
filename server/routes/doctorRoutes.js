const express = require('express');
const router = express.Router();
const { applyDoctor, getAllDoctors } = require('../controllers/doctorController');
const protect = require('../middleware/authMiddleware');

router.post('/apply', protect, applyDoctor);
router.get('/', getAllDoctors);

module.exports = router;
