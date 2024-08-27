const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

router.get("/", (req, res) => {
  let error = req.flash("error");

  res.render("index", { error, loggedIn: false });
});
router.get("/shop", async (req, res) => {
  let products = await productModel.find();

  res.render("shop", { products });
});
router.get("/addtocart/:id", async (req, res) => {


  let user  = await userModel.findOne({email: req.user.email});
});
module.exports = router;
