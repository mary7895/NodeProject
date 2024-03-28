const orderModel = require('./Models/orders');

const createOrder = async (req, res) => {
    try {
        const { userId, products } = req.body;
        const order = new orderModel({ userId, products }); 
        await order.save(); 
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('userId', 'products'); 
        res.status(200).json({ data: orders });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const EditOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { userId, products } = req.body;
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { userId, products }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update order', error });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const deletedOrder = await orderModel.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete order', error });
    }
};

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await orderModel.findById(orderId).populate('userId', 'products');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch order', error });
    }
};

module.exports = { createOrder, getAllOrders, EditOrder, deleteOrder, getOrderById }; // Corrected export

