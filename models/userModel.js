const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  fullName: {
     type: String, 
     minLength: 3 ,
     trim: true
    },
  email: String,
  password: String, 
  orders: { type: Array, default: [] },
  cart: { type: Array, default: [] },
  picture: String,
  contact: Number,
});

module.exports = mongoose.model("owner", userSchema);
