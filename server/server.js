const initApp = require("./middlewares");
const app = initApp();

const usersRouter = require("./routes/user.route");
const productRouter = require("./routes/products.route");
const checkOutRouter = require("./routes/checkout.route");
const orderRouter = require("./routes/order.route");
app.get("/", (req, res) => {
  res.send("ZoZo-shop");
});

//ROUTES_USERS
app.get("/users", usersRouter);
app.post("/users/register", usersRouter);
app.post("/users/login", usersRouter);

//ROUTES_PRODUCTS
app.get("/products", productRouter);
app.get("/products/:id", productRouter);
//ROUTES_CHECKOUT
app.post("/create-checkout-session", checkOutRouter);
app.post("/verify-session", checkOutRouter);
//ROUTES_ORDERS
app.get("/orders", orderRouter);
app.listen(3040, () => console.log("Server upNRunning"));
