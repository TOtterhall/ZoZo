//här använder man joi och gör ett schema hur man vill att det ska se ut
const Joi = require("joi");

//såhär ska vår användare se ut
const userJoiSchema = Joi.object({
  //här kan man kedja på massor av saker och regex.
  //akta sig för att om det kommer in nummer så kan joi automatiskt göra om en sträng till nummer. bra i vissa fall. men man kan skriva strict() för att få det som man vill
  email: Joi.string().email().required(),
  password: Joi.string().strict().min(8).required(),
});

//skickar in objekt eftersom det kommer läggas till flera.
module.exports = { userJoiSchema };
//måste lägga in detta i controller
