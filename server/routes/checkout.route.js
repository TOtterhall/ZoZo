const express = require("express");

const chekOutRouter = express.Router();

const {
  getItems,
  verifyPayment,
} = require("../controllers/checkout.controller.js");
chekOutRouter.post("/create-checkout-session", getItems);
chekOutRouter.post("/verify-session", verifyPayment);

module.exports = chekOutRouter;
