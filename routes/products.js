const express = require('express');
const { createProduct, getAllProducts, updateProduct,getByProductId, deleteProduct,searchbyProductName } = require('../controllers/Products');
const { auth } = require('../Middlware/auth');
const router = express.Router();

router.post('/', createProduct);
router.get('/', auth, getAllProducts);
router.patch('/:id', updateProduct);
router.get('/:id', auth, getByProductId);
router.delete('/:id', deleteProduct);
router.get('/products/search',auth, searchbyProductName); 



module.exports = router;
