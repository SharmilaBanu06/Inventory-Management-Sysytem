const Product = require("../models/Product");

// GET all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// POST - Add Product
const addProduct = async (req, res) => {
    try {

        const product = await Product.create(req.body);

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const deleteProduct = async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const updateProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct
};