const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken'); // import the default exported function


async function register(req, res) {
  try {
    const { name, email, password, role = 'admin' } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email + password required' });

    const hash = await bcrypt.hash(password, 10);
    const [rows] = await pool.query('CALL sp_create_user(?,?,?)', [name || null, email, hash]);
    const userId = rows[0][0].user_id;
    return res.json({ status:userId ,message :"user register succefully" });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Email already used' });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email + password required' });

    const [rows] = await pool.query('CALL sp_get_user_by_email(?)', [email]);
    const user = rows[0][0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken({ id: user.id, role: user.role, name: user.name, email: user.email });
    res.json({message:"user log-in succesfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getUser(req, res) {
  try {
    const userId = req.user.id;  // token se aayega

    const [rows] = await pool.query(
      "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      ok: true,
      user: rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}



module.exports = { register, login , getUser };
