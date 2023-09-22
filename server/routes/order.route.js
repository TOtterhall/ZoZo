const express = require("express");

const orderRouter = express.Router();

const { getAllOrders } = require("../controllers/ordercontroller");

orderRouter.get("/orders", getAllOrders);
module.exports = orderRouter;
