// Börja med att titta på hur den "/createcheckout skapades"
const { initStripe } = require("../stripe");
const fs = require("fs");
//STÄDA
//COOKIE-SESSION
//ERROR
//MIDDLEWARES
//
//LOGGA IN
//LOGGA UT
//REGISTERA

async function getSpecificUser(req, res) {
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
      const customer = await stripe.customers.create({
        name: username,
      });
      const newUser = {
        username,
        password,
        stripeCustomerId: customer.id,
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
}

// async function getAllUsers(req, res, next) {
//   const users = await UserModel.find();
//   return res.status(200).json(users);
// }

// function getSpecificUser(req, res) {
//   res.status(200).json(`${req.params.id} at your service`);
// }

//MÅSTE EXPORTRA DESSA mellan raderna är sådant vi skrivit i users.router.js
module.exports = { getSpecificUser };
