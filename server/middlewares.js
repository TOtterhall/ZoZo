const express = require("express");
const cors = require("cors");

const initApp = () => {
  const app = express();

  // Middleware för att tolka JSON- och URL-kodade data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Middleware för att lösa CORS-problem
  app.use(
    cors({
      origin: "*",
    })
  );

  // Här kan du lägga till ytterligare middleware eller konfiguration

  return app;
};

module.exports = initApp;
