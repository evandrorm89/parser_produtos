const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:code', productController.getProductByCode);
router.put('/:code', productController.updateProductByCode);
router.delete('/:code', productController.deleteProductByCode);

module.exports = router;
