// routes/collectionRoutes.js
const express = require('express');
const { createCollection, getCollections } = require('../controllers/collectionController');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/', getCollections);
router.post('/', auth(['admin']), createCollection);
module.exports = router;
