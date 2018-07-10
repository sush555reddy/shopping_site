var mongoose = require("mongoose");
// creating sceham
const customerSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  email: String,
  phone: Number,
  location: String
});
mongoose.model("customers", customerSchema);
