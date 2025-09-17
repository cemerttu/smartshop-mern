const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', ctrl.listProducts);
router.get('/:id', ctrl.getProduct);
router.post('/', protect, admin, ctrl.createProduct);
router.put('/:id', protect, admin, ctrl.updateProduct);
router.delete('/:id', protect, admin, ctrl.deleteProduct);

module.exports = router;
