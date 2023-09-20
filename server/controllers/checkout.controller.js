const { initStripe } = require("../stripe");
const stripe = initStripe();
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
  console.log(line_items);

  try {
    const lineItems = line_items.map((cartItem) => ({
      price: cartItem.price_data,
      quantity: cartItem.quantity,
    }));
    console.log(lineItems);
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: `${CLIENT_URL}`,
    });
    //lagt till sessionsID
    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error(error.message);
    res.status(400).json("Det gick inte att skapa betalningssessionen.");
  }
}
async function verifyPayment(req, res) {
  console.log(req.body.sessionId);
  res.status(200).json({ verified: true });
}
module.exports = { getItems, handleCart, verifyPayment };
