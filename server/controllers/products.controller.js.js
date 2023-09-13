// Börja med att titta på hur den "/createcheckout skapades"
const { initStripe } = require("../stripe");
const stripe = initStripe();
const CLIENT_URL = "http://localhost:5173";

async function getAllProducts(req, res, next) {
  try {
    const products = await stripe.products.list();

    return res.status(200).json(products.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { getAllProducts };
