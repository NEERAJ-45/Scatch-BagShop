const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27010/Scatch");
const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  cart: { type: Array, default: [] },
  isadmin: Boolean,
  orders:{ type: Array, default: [] },
  contact: Number,
  picture: String,
});

module.exports =  mongoose.model("user",userSchema)