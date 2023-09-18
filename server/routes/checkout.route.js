const express = require("express");

const chekOutRouter = express.Router();

const { getItems } = require("../controllers/checkout.controller.js");
chekOutRouter.post("/create-checkout-session", getItems);

module.exports = chekOutRouter;
