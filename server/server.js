const initApp = require("./middlewares");
const app = initApp();
const usersRouter = require("./routes/user.route");
const productRouter = require("./routes/products.route");
const checkOutRouter = require("./routes/checkout.route");
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//ROUTES
app.post("/users/register", usersRouter);
app.post("/users/login", usersRouter);
//ROUTES_PRODUCTS
app.get("/products", productRouter);
app.get("/products/:id", productRouter);
//ROUTES_CHECKOUT
// app.get("/checkout", checkOutRouter);
app.post("/create-checkout-session", checkOutRouter);

app.listen(3040, () => console.log("Server upNRunning"));
