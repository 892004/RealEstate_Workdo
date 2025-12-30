// utils/generateToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
}

// export the function directly (default)
module.exports = generateToken;
