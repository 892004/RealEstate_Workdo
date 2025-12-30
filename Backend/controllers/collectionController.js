const pool = require('../config/db');
const slugify = require('slugify');

async function createCollection(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name required' });
    const slug = slugify(name, { lower: true, strict: true });
    const [rows] = await pool.query('INSERT INTO collections (name, slug) VALUES (?,?)', [name, slug]);
    res.json({ ok: true, collectionId: rows.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getCollections(req, res) {
  try {
    const [rows] = await pool.query('SELECT id, name, slug FROM collections ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { createCollection, getCollections };
