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
const userRegister = `${CLIENT_URL}`;

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
      // return res.cookie("isLoggedIn", "true", {
      //   secure: true,
      //   httpOnly: true,
      // });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  const isLoggedIn = req.session.user ? req.session.user.isLoggedIn : false;
  console.log("Is logged in:", isLoggedIn);
  try {
    const userData = fs.readFileSync("db/users.json", "utf-8");
    const users = JSON.parse(userData);
    console.log("Received username:", username);
    console.log("Received password:", password);
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json("Wrong username or password");
    }
    console.log("Hittade ingen sådan användare:", user);
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json("Wrong username or password");
    }
    //LAGT TILL DESSA 2 BEHÖVS DET?
    // Hämta användarens Stripe Customer ID från användardata
    const stripeCustomerId = user.stripeCustomerId;

    // Kontrollera om användaren är en giltig Stripe Customer
    const stripeCustomer = await stripe.customers.retrieve(stripeCustomerId);

    if (!stripeCustomer) {
      return res.status(401).json("Invalid Stripe Customer");
    }
    delete user.password;
    req.session.user = { ...user, isLoggedIn: true };
    console.log(req.session.user);
    // if (req.session._id) {
    //   console.log(req.session._id);
    // }

    res.cookie("isLoggedIn", "true", { secure: true, httpOnly: true });
    res.status(200).json({ url: userLoggedIn, user: username });
    const isLoggedIn = req.session.user ? req.session.user.isLoggedIn : false;
    console.log("Is logged in:", isLoggedIn);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { register, login };
