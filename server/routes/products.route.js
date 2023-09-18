const express = require("express");

const productRouter = express.Router();

const {
  getAllProducts,
  getPrices,
  getSpecificProduct,
} = require("../controllers/products.controller.js");

productRouter.get("/products", getAllProducts);
productRouter.get("/products/prices", getPrices);
productRouter.get("/products/:id", getSpecificProduct);

module.exports = productRouter;
