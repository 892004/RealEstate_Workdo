const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { body, param } = require('express-validator');
const { handleValidation } = require('../middleware/validate');

const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');

// list users (admin)
router.get('/', auth(['admin']), getUsers);

// get user by id (admin)
router.get('/:id', auth(['admin']), param('id').isInt(), handleValidation, getUserById);

// update user (admin)
router.put('/:id', auth(['admin']), [
  param('id').isInt(),
  body('email').optional().isEmail(),
  body('name').optional().isString().isLength({ min: 1 }),
  body('role').optional().isIn(['admin','user']),
  body('password').optional().isLength({ min: 6 })
], handleValidation, updateUser);

// delete user (admin)
router.delete('/:id', auth(['admin']), param('id').isInt(), handleValidation, deleteUser);

module.exports = router;
