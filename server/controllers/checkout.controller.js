const { initStripe } = require("../stripe");
const stripe = initStripe();
const fs = require("fs");
const CLIENT_URL = "http://localhost:5173";
async function handleCart() {
  const id = req.params.id;
  try {
    const item = await stripe.line_items.retrieve(id);
    if (!item) {
      return res.status(404).json({ error: "Produkten hittades inte" });
    }
    return res.status(200).json(item.id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
async function getItems(req, res, next) {
  const { line_items } = req.body;

  try {
    const lineItems = line_items.map((cartItem) => ({
      price: cartItem.price_data,
      quantity: cartItem.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: `${CLIENT_URL}`,
    });

    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error(error.message);
    res.status(400).json("Det gick inte att skapa betalningssessionen.");
  }
}

async function verifyPayment(req, res) {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
    if (session.payment_status !== "paid") {
      return res.status(400).json({ verified: false });
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(
      req.body.sessionId
    );
    const order = {
      created: session.created,
      id: session.created,
      customer: session.customer_details.name,
      product: lineItems.data.map((cartItem) => {
        return {
          product: cartItem.description,
          quantity: cartItem.quantity,
          // price: cartItem.price.unit_amont / 100,
        };
      }),
    };

    const orderData = fs.readFileSync("db/orders.json", "utf-8");
    const orders = JSON.parse(orderData);

    orders.push(order);

    fs.writeFileSync("db/orders.json", JSON.stringify(orders));

    res.status(200).json({ verified: true });
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { getItems, handleCart, verifyPayment };
