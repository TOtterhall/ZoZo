const { initStripe } = require("../stripe");
const stripe = initStripe();
const fs = require("fs");
const CLIENT_URL = "http://localhost:5173";

async function getAllOrders(req, res) {
  try {
    const isLoggedIn = req.session.user ? true : false;

    if (!isLoggedIn) {
      return res.status(401).json("Not logged in");
    }

    const loggedInUsername = req.session.user.username;

    const orderData = fs.readFileSync("db/orders.json", "utf-8");
    const orders = JSON.parse(orderData);

    const userOrders = orders.filter(
      (order) => order.customer === loggedInUsername
    );

    res.status(200).json(userOrders);
  } catch (error) {
    console.error("Fel vid hämtning av ordrar:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { getAllOrders };
