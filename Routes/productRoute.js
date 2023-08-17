const express = require('express');
const { uploadPhoto, resizePhoto, getProducts, createProduct, updateProduct, deleteProduct } = require('../Controllers/productController');
const { isLoggedIn, restrictTo } = require('../Middelware/authMiddelware');

const router = express.Router()
router.use(isLoggedIn);
router.get('/', getProducts);

router.use(restrictTo('admin'));

router.post('/', uploadPhoto, resizePhoto, createProduct);

router.patch('/:id', uploadPhoto, resizePhoto, updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;
