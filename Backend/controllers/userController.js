const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// GET /api/users  (already present) - list all
async function getUsers(req, res) {
  try {
    const [rows] = await pool.query("SELECT id, name, email, role, created_at FROM users ORDER BY id DESC");
    res.json({ ok: true, users: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// GET /api/users/:id
async function getUserById(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id]);
    if (!rows[0]) return res.status(404).json({ ok:false, error: 'User not found' });
    res.json({ ok: true, user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// PUT /api/users/:id  (update user, admin only)
async function updateUser(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, email, role, password } = req.body;

    // if password provided -> hash it
    let passwordHash = null;
    if (password) passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email), role = COALESCE(?, role), ${password ? 'password_hash = ?' : 'password_hash = password_hash'} WHERE id = ?`,
      password ? [name || null, email || null, role || null, passwordHash, id] : [name || null, email || null, role || null, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ ok:false, error: 'User not found' });
    res.json({ ok: true, message: 'User updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// DELETE /api/users/:id
async function deleteUser(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ ok:false, error: 'User not found' });
    res.json({ ok: true, message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { getUsers, getUserById, updateUser, deleteUser };
