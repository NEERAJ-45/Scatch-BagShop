const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27010/Scatch");
const ownerSchema = mongoose.Schema({
  fullName: {
     type: String, 
     trim: true,
     minLength: 3 
    },
  email: String,
  password: String,
  isadmin: Boolean,
  products: { type: Array, default: [] },
  picture: String,
  gstin: String,
});

module.exports = mongoose.model("owner", ownerSchema);
