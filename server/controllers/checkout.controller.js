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

async function handlePayment() {
  const response = await fetch("http://localhost:3040/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(""),
  });
  if (!response.ok) {
    return;
  }

  const { url } = await response.json();
  window.location = url;
}

async function getItems(req, res, next) {
  const { line_items } = req.body;
  console.log(line_items);

  // Check if req.body.cart is an array
  //   if (!Array.isArray(cart)) {
  //     return res
  //       .status(400)
  //       .json("Invalid request body format. 'cart' should be an array.");
  //   }

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

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error.message);
    res.status(400).json("Det gick inte att skapa betalningssessionen.");
  }
}

module.exports = { getItems, handleCart, handlePayment };

// //POST
// app.post("/create-checkout-session", async (req, res) => {
//   //Inga krav på validering, bara krav på krypteralösenordet,fokus Stripe.
//   //Man kan om man vill hantera felhantering
//   try {
//     const session = await stripe.checkout.sessions.create({
//       //I inlämingen så kommer vi behöva mappa ut...
//       //   line_items: req.body.map((item) => {
//       //     return {
//       //       price: item.product,
//       //       quantity: item.quantity,
//       //     };
//       //   }),
//       //line är våran cart, våra produkter här är det hårdkodat
//       line_items: [
//         {
//           //pricedata är produktdata egentligen
//           price_data: {
//             currency: "sek",
//             product_data: {
//               name: "hundhalsband",
//               description: "bästa halsbandet ever...",
//             },
//             //priset och det räknas i öra så detta är 249kr
//             unit_amount: "24900",
//           },
//           quantity: 2,
//         },
//       ],
//       mode: "payment",
//       success_url: `${CLIENT_URL}/confirmation`,
//       //här hamnar man bara på startsidan men man kanske vill hamna någonannanstans om betalningen inte går igenom...
//       cancel_url: `${CLIENT_URL}`,
//     });
//     //vad vill du göra när du får tillbaka sessionen? Ska stå här. finns en property som heter url- där vill vi att kundne ska hamna.
//     //kan välja att skicka tillbaka fler saker eller sessionsobjektet
//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json("det gick inte alls bra det här du...");
//   }
// });

// =====NEDAN LÅG TIDIGARE I SERVER FRÅN LEKTIONSANTECKNINGAR==========
// app.post("/users/login", async (req, res) => {
// const { username, password } = req.body;
// try {
//   const stripe = initStripe();
//   const userData = fs.readFileSync("db/users.json", "utf-8");
//   let users = JSON.parse(userData);
//   console.log(userData);
//   if (!Array.isArray(users)) {
//     users = [];
//   }
//   const user = users.find(
//     (u) => u.username === username && u.password === password
//   );
//   if (!user) {
//     const customer = await stripe.customers.create({
//       name: username,
//     });
//     const newUser = {
//       username,
//       password,
//       stripeCustomerId: customer.id,
//     };
//     users.push(newUser);
//     console.log("User added:", newUser);
//     // NYA LISTAN
//     fs.writeFileSync("db/users.json", JSON.stringify(users));
//   }
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ error: "Något gick fel" });
// }
// });
// app.post("/create-checkout-session", async (req, res) => {
//     //Inga krav på validering, bara krav på krypteralösenordet,fokus Stripe.
//     //Man kan om man vill hantera felhantering
//     try {
//       const session = await stripe.checkout.sessions.create({
//         //I inlämingen så kommer vi behöva mappa ut...
//         //   line_items: req.body.map((item) => {
//         //     return {
//         //       price: item.product,
//         //       quantity: item.quantity,
//         //     };
//         //   }),
//         //line är våran cart, våra produkter här är det hårdkodat
//         line_items: [
//           {
//             //pricedata är produktdata egentligen
//             price_data: {
//               currency: "sek",
//               product_data: {
//                 name: "hundhalsband",
//                 description: "bästa halsbandet ever...",
//               },
//               //priset och det räknas i öra så detta är 249kr
//               unit_amount: "24900",
//             },
//             quantity: 2,
//           },
//         ],
//         mode: "payment",
//         success_url: `${CLIENT_URL}/confirmation`,
//         //här hamnar man bara på startsidan men man kanske vill hamna någonannanstans om betalningen inte går igenom...
//         cancel_url: `${CLIENT_URL}`,
//       });
//       //vad vill du göra när du får tillbaka sessionen? Ska stå här. finns en property som heter url- där vill vi att kundne ska hamna.
//       //kan välja att skicka tillbaka fler saker eller sessionsobjektet
//       res.status(200).json({ url: session.url });
//     } catch (error) {
//       console.log(error.message);
//       res.status(400).json("det gick inte alls bra det här du...");
//     }
//   });
// processobjektet ligger inbyggt i node
// console.log(process.env.STRIPE_SECRET_KEY);
//ANVÄND ROUTER OCH EN CONTROLLER KUNDER OCH PRODUKTER
