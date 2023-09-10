require("dotenv").config();

const initApp = require("./middlewares");
const app = initApp();
const usersRouter = require("./routes/user.route");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//ROUTES
app.post("/users/login", usersRouter);

app.listen(3040, () => console.log("Server upNRunning"));
