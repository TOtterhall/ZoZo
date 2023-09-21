require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const initApp = () => {
  const app = express();

  // Middleware för att tolka JSON- och URL-kodade data
  app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));

  // Middleware för att lösa CORS-problem
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );

  //COOKIES
  app.use(
    cookieSession({
      name: "session",
      keys: [process.env.COOKIE_SESSION_KEY],
      maxAge: 1000 * 60 * 60 * 24, // 24 Hours
      sameSite: "strict",
      httpOnly: true,
      secure: false,
    })
  );
  // Här kan du lägga till ytterligare middleware eller konfiguration

  return app;
};

module.exports = initApp;
