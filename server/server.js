const { initStripe } = require("./stripe");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const usersRouter = require("./routes/user.route");
//har vi en array så tar vi den och gör om den den går exempelvis igenom alla post ex postanropen
app.use(express.json());
const CLIENT_URL = "http://localhost:5173";

//MIDDLEWARES
//Ser till att vår client får ansluta utan corsproblem...
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/users", usersRouter);
//GET
app.get("/", (req, res) => {
  res.send("Hello from express");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const stripe = initStripe();

    const userData = fs.readFileSync("db/users.json", "utf-8");
    let users = JSON.parse(userData);
    console.log(userData);

    if (!Array.isArray(users)) {
      users = [];
    }

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      const newUser = {
        username,
        password,
        stripeCustomerId: "",
      };

      users.push(newUser);
      console.log("User added:", newUser);
      // NYA LISTAN
      fs.writeFileSync("db/users.json", JSON.stringify(users));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Något gick fel" });
  }
});
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
app.listen(3400, () => console.log("Server upNRunning"));
