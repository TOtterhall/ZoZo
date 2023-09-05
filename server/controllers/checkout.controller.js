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
