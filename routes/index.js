const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");

router.get("/", (req, res) => {
  let error = req.flash("error");

  res.render("index", { error });
});
router.get("/shop", async(req, res) => {
  // const products = [
  //   {
  //     name: "Clinge Bag",
  //     price: 1200,
  //     imageName: "clinge-bag.PNG", 
  //     bgcolor: "#A7C7E7",
  //     panelcolor: "#7393B3",
  //     textcolor: "#FFFFFF",
  //   },
   

  let products =   await productModel.find()


  
  res.render("shop", { products });
});
module.exports = router;
