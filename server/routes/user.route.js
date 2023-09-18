const express = require("express");

const userRouter = express.Router();

const { register, login } = require("../controllers/user.controller");

userRouter.post("/users/register", register);
userRouter.post("/users/login", login);

module.exports = userRouter;
