  const express = require('express');
  const { body, param, query } = require('express-validator');
  const { handleValidation } = require('../middleware/validate');
  const { auth } = require('../middleware/authMiddleware');

  const {
    createProduct,
    getProductWithVariants,
    listProducts,
    getProductsByCollection,
    adminListProducts,
    updateProduct,
    deleteProduct,
    getProductsByIds,
  } = require('../controllers/productController');

  const router = express.Router();

  /* =======================
    STATIC ROUTES FIRST
  ======================= */

  // Admin full product list
  router.get(
    '/admin-list',
    auth(['admin']),
    handleValidation,
    adminListProducts
  );

  // Get multiple products by ids
  router.get(
    '/by-ids',
    query('ids').notEmpty(),
    handleValidation,
    getProductsByIds
  );

  // get product by collection
  router.get(
    '/by-collection/:slug',
    param('slug').isString(),
    handleValidation,
    getProductsByCollection
  );

  // Public product list
  router.get(
    '/',
    [
      query('page').optional().isInt({ min: 1 }),
      query('limit').optional().isInt({ min: 1 }),
    ],
    handleValidation,
    listProducts
  );

  // Create product (admin)
  router.post(
    '/',
    auth(['admin']),
    [
      body('title').notEmpty(),
      body('short_desc').optional().isString(),
      body('long_desc').optional().isString(),
    ],
    handleValidation,
    createProduct
  );

  /* =======================
    DYNAMIC ROUTES LAST
  ======================= */

  // Get single product
  router.get(
    '/:id',
    param('id').isInt(),
    handleValidation,
    getProductWithVariants
  );




  // Update product
  router.put(
    '/:id',
    auth(['admin']),
    [
      param('id').isInt(),
      body('title').optional().isString(),
      body('short_desc').optional().isString(),
      body('long_desc').optional().isString(),
    ],
    handleValidation,
    updateProduct
  );

  // Delete product
  router.delete(
    '/:id',
    auth(['admin']),
    param('id').isInt(),
    handleValidation,
    deleteProduct
  );

  module.exports = router;
