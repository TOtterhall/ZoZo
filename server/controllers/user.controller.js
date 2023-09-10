// Börja med att titta på hur den "/createcheckout skapades"
const { initStripe } = require("../stripe");
const fs = require("fs");
const bcrypt = require("bcrypt");

//COOKIE-SESSION
//ERROR

//
//LOGGA IN
//LOGGA UT
//REGISTERA
const CLIENT_URL = "http://localhost:5173";
//Här vill jag att användaren ska hamna någonannanstans såklart. Enabrt för test.
const userLoggedIn = `${CLIENT_URL}/confirmation`;
//USER REGISTER
async function register(req, res) {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

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
      const customer = await stripe.customers.create({
        name: username,
      });
      const newUser = {
        username,
        password: hashedPassword,
        email,
        stripeCustomerId: customer.id,
        url: `${CLIENT_URL}`,
      };

      users.push(newUser);
      console.log("User added:", newUser);
      // NYA LISTAN
      fs.writeFileSync("db/users.json", JSON.stringify(users));
      res.status(200).json({ url: userLoggedIn });
      // res.status(200).json("YAAA DU LYCKADES REGISTREA DIG");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Något gick fel" });
  }
}

// async function getAllUsers(req, res, next) {
//   const users = await UserModel.find();
//   return res.status(200).json(users);
// }

// function getSpecificUser(req, res) {
//   res.status(200).json(`${req.params.id} at your service`);
// }

//MÅSTE EXPORTRA DESSA mellan raderna är sådant vi skrivit i users.router.js
module.exports = { register };
