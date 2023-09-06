// const express = require("express");
// const bodyParser = require("body-parser");
// const fs = require("fs");
// let usStates = require("./db/users.json");
// const app = express();

// //save function
// const save = () => {
//   fs.writeFile("./users.json", JSON.stringify(users, null, 2), (error) => {
//     if (error) {
//       throw error;
//     }
//   });
// };
// //Read(R) in CRUD
// app.get("/users", (req, res) => {
//   res.json(usStates);
// });
// app.get("/users/:name", (req, res) => {
//   const findState = users.find((user) => user.user === req.params.name);
//   res.json(findState);
// });
// //Create(C) in CRUD
// app.post("/states", bodyParser.json(), (req, res) => {
//   usStates.push(req.body);
//   save();
//   res.json({
//     status: "success",
//     stateInfo: req.body,
//   });
// });
// //Update(U) in CRUD
// app.put("/states/:name", bodyParser.json(), (req, res) => {
//   usStates = usStates.map((state) => {
//     if (state.state === req.params.name) {
//       return req.body;
//     } else {
//       return state;
//     }
//   });
//   save();
//   res.json({
//     status: "success",
//     stateInfo: req.body,
//   });
// });
// //Delete(D) in CRUD
// app.delete("/states/:name", (req, res) => {
//   usStates = usStates.filter((state) => state.state !== req.params.name);
//   save();
//   res.json({
//     status: "success",
//     removed: req.params.name,
//     newLength: usStates.length,
//   });
// });
// app.listen(3060, () => {
//   console.log(`Array of US States at http://localhost:3060`);
// });

// // const express = require("express");
// // const cors = require("cors");
// // const cookieSession = require("cookie-session");
// // require("express-async-errors");

// // const { userRouter } = require("./resources/user/user.router");
// // const { errorRequestHandler } = require("./error");

// // const app = express();
// // app.use(express.json());
// // app.use(cors({ origin: true, credentials: true }));
// // app.use(
// //   cookieSession({
// //     name: "session",
// //     keys: ["aVeryS3cr3tK3y"],
// //     maxAge: 1000 * 60 * 60 * 24, // 24 Hours
// //     sameSite: "strict",
// //     httpOnly: true,
// //     secure: false,
// //   })
// // );

// // // Add routers
// // // app.use("/api", productRouter);
// // // app.use("/api", orderRouter);
// // app.use("/api", userRouter);
// // // app.use("/api", categoryRouter);
// // // app.use("/api", ShippingMethodRouter);

// // app.use((req, res) => {
// //   console.log("!404!");
// //   res.status(404).json("Missing resource");
// // });

// // // Error handler
// // app.use(errorRequestHandler);

// // module.exports = { app };
