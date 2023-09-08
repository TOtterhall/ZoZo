const { initStripe } = require("./stripe");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const initApp = require("./middlewares");
const app = initApp();
const usersRouter = require("./routes/user.route");
//har vi en array så tar vi den och gör om den den går exempelvis igenom alla post ex postanropen
// app.use(express.json());
const CLIENT_URL = "http://localhost:5173";
app.get("/", (req, res) => {
  res.res;
  send("Hello, World!");
});

//ROUTES
//ska vara app.use/...titta på
app.post("/users/login", usersRouter);

app.listen(3400, () => console.log("Server upNRunning"));
