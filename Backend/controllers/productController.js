const pool = require('../config/db');
const slugify = require('slugify');

// ================= CREATE PRODUCT =================
async function createProduct(req, res) {
  try {
    const { title, short_desc, long_desc } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });

    const baseSlug = slugify(title, { lower: true, strict: true });
    const uniqueSlug = `${baseSlug}-${Date.now()}`;

    const [rows] = await pool.query(
      'CALL sp_create_product(?,?,?,?)',
      [title, uniqueSlug, short_desc || null, long_desc || null]
    );

    res.json({ ok: true, status: rows[0][0].product_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// ================= GET PRODUCT WITH VARIANTS =================
async function getProductWithVariants(req, res) {
  try {
    const productId = parseInt(req.params.id, 10);

    const [productRows] = await pool.query(
      'SELECT id, title, short_desc, long_desc, created_at FROM products WHERE id = ?',
      [productId]
    );

    if (!productRows.length)
      return res.status(404).json({ error: 'Product not found' });

    const [variants] = await pool.query(
      `SELECT id, collection_id, sqft, price, stock, image_url, sku
       FROM product_varients
       WHERE product_id = ?`,
      [productId]
    );

    res.json({
      product: productRows[0],
      variants
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// ================= LIST PRODUCTS =================
async function listProducts(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.max(1, parseInt(req.query.limit || '50', 10));
    const offset = (page - 1) * limit;

    const [rows] = await pool.query(
      `SELECT id, title, short_desc, slug, created_at
       FROM products
       ORDER BY id DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.json({ ok: true, products: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// ================= GET PRODUCTS BY COLLECTION (FIXED) =================
async function getProductsByCollection(req, res) {
  try {
    const { slug } = req.params;

    // 1️⃣ Get products in this collection
    const [products] = await pool.query(
      `
      SELECT DISTINCT
        p.id,
        p.title,
        p.short_desc,
        p.long_desc,
        p.created_at
      FROM products p
      JOIN product_varients pv ON pv.product_id = p.id
      JOIN collections c ON c.id = pv.collection_id
      WHERE c.slug = ?
      ORDER BY p.id DESC
      `,
      [slug]
    );

    if (!products.length) return res.json([]);

    // 2️⃣ Get all variants for these products
    const productIds = products.map(p => p.id);
    const placeholders = productIds.map(() => '?').join(',');

    const [variants] = await pool.query(
      `
      SELECT id, product_id, collection_id, sqft, price, stock, image_url, sku
      FROM product_varients
      WHERE product_id IN (${placeholders})
      `,
      productIds
    );

    // 3️⃣ Group variants
    const variantMap = {};
    variants.forEach(v => {
      if (!variantMap[v.product_id]) {
        variantMap[v.product_id] = [];
      }
      variantMap[v.product_id].push(v);
    });

    // 4️⃣ Final response
    const response = products.map(p => ({
      product: p,
      variants: variantMap[p.id] || []
    }));

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// ================= ADMIN LIST PRODUCTS =================
async function adminListProducts(req, res) {
  try {
    const [products] = await pool.query(
      `SELECT * FROM products ORDER BY id DESC`
    );

    const [variants] = await pool.query(
      `SELECT pv.*, c.name AS collection_name
       FROM product_varients pv
       LEFT JOIN collections c ON c.id = pv.collection_id`
    );

    const map = {};
    variants.forEach(v => {
      if (!map[v.product_id]) map[v.product_id] = [];
      map[v.product_id].push(v);
    });

    res.json({
      ok: true,
      products: products.map(p => ({
        ...p,
        variants: map[p.id] || []
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// ================= UPDATE PRODUCT =================
async function updateProduct(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, short_desc, long_desc } = req.body;
    const slug = title ? slugify(title, { lower: true, strict: true }) : null;

    const [result] = await pool.query(
      `UPDATE products
       SET title = COALESCE(?, title),
           short_desc = COALESCE(?, short_desc),
           long_desc = COALESCE(?, long_desc),
           slug = COALESCE(?, slug)
       WHERE id = ?`,
      [title, short_desc, long_desc, slug, id]
    );

    if (!result.affectedRows)
      return res.status(404).json({ error: 'Product not found' });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// ================= DELETE PRODUCT =================
async function deleteProduct(req, res) {
  try {
    const id = parseInt(req.params.id, 10);
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// ================= GET PRODUCTS BY IDS =================
async function getProductsByIds(req, res) {
  try {
    const ids = req.query.ids?.split(',').map(Number).filter(Boolean);
    if (!ids?.length) return res.json([]);

    const placeholders = ids.map(() => '?').join(',');

    const [products] = await pool.query(
      `SELECT * FROM products WHERE id IN (${placeholders})`,
      ids
    );

    const [variants] = await pool.query(
      `SELECT * FROM product_varients WHERE product_id IN (${placeholders})`,
      ids
    );

    const map = {};
    variants.forEach(v => {
      if (!map[v.product_id]) map[v.product_id] = [];
      map[v.product_id].push(v);
    });

    res.json(products.map(p => ({
      ...p,
      variants: map[p.id] || []
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  createProduct,
  getProductWithVariants,
  listProducts,
  getProductsByCollection,
  adminListProducts,
  updateProduct,
  deleteProduct,
  getProductsByIds
};
