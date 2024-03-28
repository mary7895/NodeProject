const express = require('express');
const{createOrder,getAllOrders,EditOrder,deleteOrder,getOrderById}=require('../controllers/orders')
const { auth } = require('../Middlware/auth');
const router = express.Router();

router.post('/', auth,createOrder);
router.get('/', auth, getAllOrders);
router.patch('/:orderId', auth, EditOrder);
router.delete('/:orderId', auth, deleteOrder);
router.get('/:orderId', auth, getOrderById);


module.exports = router;