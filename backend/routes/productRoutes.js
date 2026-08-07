const express = require("express");
const router = express.Router();

const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct
} = require("../controllers/productController");

// GET All Products
router.get("/", getProducts);

// POST add product
router.post("/", addProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

module.exports = router;