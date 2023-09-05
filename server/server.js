// const env = require("dotenv");
// env.config();
//Istället för ovan så config direkt den ska ligga högst upp eftersom att den ska läsas först. Bra tt dubelkolla så man inte använder keys
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
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

//POST
app.post("/create-checkout-session", async (req, res) => {
  //Inga krav på validering, bara krav på krypteralösenordet,fokus Stripe.
  //Man kan om man vill hantera felhantering
  try {
    const session = await stripe.checkout.sessions.create({
      //I inlämingen så kommer vi behöva mappa ut...
      //   line_items: req.body.map((item) => {
      //     return {
      //       price: item.product,
      //       quantity: item.quantity,
      //     };
      //   }),
      //line är våran cart, våra produkter här är det hårdkodat
      line_items: [
        {
          //pricedata är produktdata egentligen
          price_data: {
            currency: "sek",
            product_data: {
              name: "hundhalsband",
              description: "bästa halsbandet ever...",
            },
            //priset och det räknas i öra så detta är 249kr
            unit_amount: "24900",
          },
          quantity: 2,
        },
      ],
      mode: "payment",
      success_url: `${CLIENT_URL}/confirmation`,
      //här hamnar man bara på startsidan men man kanske vill hamna någonannanstans om betalningen inte går igenom...
      cancel_url: `${CLIENT_URL}`,
    });
    //vad vill du göra när du får tillbaka sessionen? Ska stå här. finns en property som heter url- där vill vi att kundne ska hamna.
    //kan välja att skicka tillbaka fler saker eller sessionsobjektet
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("det gick inte alls bra det här du...");
  }
});
// processobjektet ligger inbyggt i node
// console.log(process.env.STRIPE_SECRET_KEY);
//ANVÄND ROUTER OCH EN CONTROLLER KUNDER OCH PRODUKTER
app.listen(3400, () => console.log("Server upNRunning"));
