const express = require("express");

const productRouter = express.Router();

const { getAllProducts } = require("../controllers/products.controller.js");

productRouter.get("/products", getAllProducts);

module.exports = productRouter;
