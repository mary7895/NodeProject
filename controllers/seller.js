const productModel = require('./Models/products');
const sellerModel = require('./Models/seller');

const createNewSeller = async (req, res, next) => {
    try {
        const seller = req.body;
        const newSeller = await sellerModel.create(seller);
        res.status(201).json({ data: newSeller });
    } catch (err) {
        next({ status: 500, error: err });
    }
};

const getAllSellers = async (req, res, next) => {
    try {
        const sellers = await sellerModel.find();
        res.status(200).json({ data: sellers });
    } catch (err) {
        next(err);
    }
};

const getProductsBySellerID = async (req, res, next) => {
    try {
        const sellerId = req.params.id; 
        const products = await productModel.find({ sellerId }).populate('sellerId'); // Corrected population field
        res.json(products);
    } catch (error) {
        next({ status: 500, error: error.message });
    }
};

const addProductBySeller = async (req, res, next) => {
    try {
        const { sellerId } = req.params;
        const { name, description } = req.body;

        const seller = await sellerModel.findById(sellerId);
        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        const product = new productModel({ name, description, seller: sellerId });
        await product.save();

        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        next({ status: 500, error: error.message });
    }
};

const editProductBySeller = async (req, res, next) => {
    try {
        const { sellerId, productId } = req.params;
        const { name, description } = req.body;

        // Check if the product exists and belongs to the seller
        const product = await productModel.findOne({ _id: productId, seller: sellerId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found or does not belong to the seller' });
        }

        // Update the product details
        product.name = name || product.name;
        product.description = description || product.description;
        await product.save();

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        next({ status: 500, error: error.message });
    }
};

const deleteProductBySeller=async (req, res) => {
    try {
      const product = await productModel.findByIdAndDelete({
        _id: req.params.productId,
        seller: req.params.sellerId,
      });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = { createNewSeller, getAllSellers, addProductBySeller, getProductsBySellerID, editProductBySeller, deleteProductBySeller};


