// Börja med att titta på hur den "/createcheckout skapades"
const { initStripe } = require("../stripe");
const stripe = initStripe();
const fs = require("fs");
const bcrypt = require("bcrypt");
//LÄS PÅ och felhantera bättre
// const ServerError = require("../serverError");
//COOKIE-SESSION
//ERROR(har en fil men titta mer på den och läs på)

//REGISTERA
const CLIENT_URL = "http://localhost:5173";
//Här vill jag att användaren ska hamna någonannanstans såklart. Enabrt för test.

const userLoggedIn = `${CLIENT_URL}`;
const userRegister = `${CLIENT_URL}/login`;
//USER REGISTER
async function register(req, res) {
  const { username, password, email, stripeCustomerId } = req.body;
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

    const existingUser = users.find((u) => u.username === username);

    if (existingUser) {
      return res.status(409).json("Användaren finns redan");
    }
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
      req.session.user = {
        username,
        email,
        stripeCustomerId,

        // ... andra användaruppgifter du vill spara
      };

      // NYA LISTAN
      fs.writeFileSync("db/users.json", JSON.stringify(users));
      res.status(200).json({ url: userRegister });
      // return res.status(200).json({ message: "Användaren har registrerats." });
      // res.status(200).json("YAAA DU LYCKADES REGISTREA DIG");
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const userData = fs.readFileSync("db/users.json", "utf-8");
    const users = JSON.parse(userData);
    console.log("Received username:", username);
    console.log("Received password:", password);
    const user = users.find((u) => u.username === username);
    console.log("Found user:", user);
    if (!user) {
      return res.status(401).json("Wrong username or password");
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json("Wrong username or password");
    }

    delete user.password;
    req.session = user;

    if (req.session._id) {
      console.log(req.session._id);
    }

    res.status(200).json({ url: userLoggedIn });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { register, login };
