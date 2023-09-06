const express = require("express");
//Ist för app....Här döper man den till rou eller useroruter istället för att instansiera hela express så går m an in i router.
const router = express.Router();
//här kan vi sllänga in det vi skrivit i controller
const {
  // getAllUsers,
  getSpecificUser,
} = require("../controllers/user.controller");

// router.get("/", getAllUsers);

router.get("/:id", getSpecificUser);

//Här måste man eportera här kan man exportera flera saker men här har vi endast exporterat vår router.
// Man kan skriva module.exports={router} alltså vi exporterar vår router som ett objekt  MEN då måste man tänka på att även importra den på detta sättet.
module.exports = router;
