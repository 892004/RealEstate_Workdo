const jwt = require('jsonwebtoken');

function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  // "Bearer <token>" check
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded: { id, role, name, email, iat, exp }
    req.user = decoded;

    next();

  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Token invalid or expired" });
  }
}

module.exports = protect;
