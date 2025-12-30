// controllers/variantController.js
const pool = require("../config/db");

async function createVariant(req, res) {
  try {
    const productId = parseInt(req.params.productId, 10);
    const { collection_id, sqft, price, stock = 0, sku = null, image_url } =
      req.body;

    if (!productId || !collection_id) {
      return res
        .status(400)
        .json({ error: "productId and collection_id required" });
    }

    // 👉 file ho to file ka path, warna body ka image_url
    const imgPath = req.file
      ? `/uploads/${req.file.filename}`
      : image_url || null;

    console.log("createVariant =>", {
      productId,
      collection_id,
      sqft,
      price,
      stock,
      sku,
      imgPath,
    });

    // ✅ DIRECT INSERT – koi stored procedure NHI
    const [result] = await pool.query(
      `INSERT INTO product_varients
         (product_id, collection_id, sqft, price, stock, image_url, sku)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        productId,
        collection_id,
        sqft || null,
        price || 0,
        stock || 0,
        imgPath,
        sku || null,
      ]
    );

    const variantId = result.insertId;

    return res.json({
      ok: true,
      variantId,
      image_url: imgPath,
    });
  } catch (err) {
    console.error("createVariant error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function getVariantsByCollection(req, res) {
  try {
    const collectionId = parseInt(req.params.collectionId, 10);

    const [rows] = await pool.query(
      `SELECT
          pv.id AS variant_id,
          pv.product_id,
          p.title,
          pv.sqft,
          pv.price,
          pv.stock,
          pv.image_url
       FROM product_varients pv
       JOIN products p ON pv.product_id = p.id
       WHERE pv.collection_id = ?
       ORDER BY pv.created_at DESC`,
      [collectionId]
    );

    return res.json(rows);
  } catch (err) {
    console.error("getVariantsByCollection error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { createVariant, getVariantsByCollection };
