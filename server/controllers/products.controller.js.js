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

async function getPrices(req, res, next) {
  try {
    const prices = await stripe.prices.list({
      limit: 4,
    });

    return res.status(200).json(prices.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getSpecificProduct(req, res, next) {
  const id = req.params.id;
  try {
    const product = await stripe.products.retrieve(id);
    if (!product) {
      return res.status(404).json({ error: "Produkten hittades inte" });
    }
    return res.status(200).json(product.id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { getAllProducts, getSpecificProduct, getPrices };
