const productModel = require("./Models/products");

const createProduct = async (req, res, next) => {
  try {
    const { name, description, sellerId } = req.body;
    const newProduct = await productModel.create({
      name,
      description,
      sellerId,
    });
    res
      .status(201)
      .json({ success: "Product added successfully", data: newProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find().populate("sellerId");
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, sellerId } = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, description, sellerId },
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "No product with this Id found." });
    }
    res.status(200).json({ data: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

const getByProductId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id).populate("sellerId");
    if (!product) {
      return res
        .status(404)
        .json({ message: "No product found with this ID." });
    }
    res.status(200).json({ data: product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
};

const searchbyProductName = async (req, res, next) => {
  const { name } = req.query;
  try {
    const products = await productModel.find({
      name: { $regex: new RegExp(name, "i") },
    }); // Use $regex to perform case-insensitive search
    if (products.length > 0) {
      res.status(200).json({ data: products });
    } else {
      res.status(404).json({ message: "Products not found" });
    }
  } catch (error) {
    next({ status: 500, error });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "No product found with this ID." });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  getByProductId,
  deleteProduct,
  searchbyProductName,
};
