const express = require("express");
//Ist för app....Här döper man den till route eller useroruter istället för att instansiera hela express så går m an in i router.
const userRouter = express.Router();
//här kan vi sllänga in det vi skrivit i controller

const {
  // getAllUsers,
  register,
  login,
} = require("../controllers/user.controller");

// userRouter.get("/", getAllUsers);
// userRouter.get("/api", (req, res) => {
//   res.send("Hello from UserROuter");
//   console.log("Hello from UserRouter");
// });
userRouter.post("/users/register", register);
userRouter.post("/users/login", login);
// userRouter.get("/:id", getSpecificUser);
// FÖr att få med en kaka
// const userId = req.session.userId;
//Här måste man eportera här kan man exportera flera saker men här har vi endast exporterat vår router.
// Man kan skriva module.exports={router} alltså vi exporterar vår router som ett objekt  MEN då måste man tänka på att även importra den på detta sättet.
module.exports = userRouter;

//Router är till för att dela upp saker och ting
// validering är att vi vill ha kontroll på vad som ska in en specifikprodukt
//joi vallidera req.body
//BRA att ha vallidering på båda ställena.
