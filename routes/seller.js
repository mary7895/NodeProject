const express = require('express');
const { createNewSeller, getAllSellers, addProductBySeller, getProductsBySellerID,editProductBySeller,deleteProductBySeller } = require('../controllers/seller');
const { auth } = require('../Middlware/auth');
const router = express.Router();

router.post('/', createNewSeller);
router.get('/', getAllSellers);
router.post('/:sellerId/products', addProductBySeller);
router.get('/:id/products', auth, getProductsBySellerID); 
router.post('/:sellerId/products', addProductBySeller);
router.patch('/:sellerId/products/:productId', editProductBySeller);
router.delete('seller/:sellerId/products/:productId', deleteProductBySeller)


module.exports = router;
