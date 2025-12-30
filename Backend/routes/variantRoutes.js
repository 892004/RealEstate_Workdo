// routes/variantRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");

const { auth } = require("../middleware/authMiddleware");
const {
  createVariant,
  getVariantsByCollection,
} = require("../controllers/variantController");

const router = express.Router();

// ------- Multer config -------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /jpeg|jpg|png|webp|avif/.test(file.mimetype);
    if (!ok) return cb(new Error("Only images allowed"));
    cb(null, true);
  },
});

// POST /api/variants/:productId (admin)
router.post(
  "/:productId",
  auth(["admin"]),
  upload.single("image"), // optional file
  createVariant
);

// GET /api/variants/collection/:collectionId
router.get("/collection/:collectionId", getVariantsByCollection);

module.exports = router;
