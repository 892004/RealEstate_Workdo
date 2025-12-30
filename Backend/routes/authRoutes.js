const express = require('express');
const router = express.Router();

const { register, login, getUser } = require('../controllers/authController');
const protect = require('../middleware/protect'); // JWT verify middleware

router.post('/register', register);
router.post('/login', login);

router.get('/me', protect, getUser);  // ← yaha add karo

module.exports = router;
