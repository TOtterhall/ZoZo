const initStripe = () => {
  // const stripe = require("stripe");
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  return stripe;
};

module.exports = { initStripe };
