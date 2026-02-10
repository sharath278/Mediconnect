const express = require('express');
const router = express.Router();
const { analyzeSymptoms } = require('../controllers/aiController');
const protect = require('../middleware/authMiddleware');

// Using protect middleware if we want only logged-in users to use this
// For now, let's keep it protected to encourage registration
router.post('/analyze', protect, analyzeSymptoms);

module.exports = router;
