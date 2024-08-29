const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");


const setFlashMessages = (req, res, next) => {
  res.locals.messages = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  next();
};

router.use(setFlashMessages); 

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/cart", isLoggedIn, async (req, res) => {
  try {
    let user = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");

    user.cart = user.cart.map((item) => {
      item.bill = Number(item.price) - Number(item.discount) + 20; 
      return item;
    });

    res.render("cart", { user });
  } catch (error) {
    console.error("Error fetching cart:", error);
    req.flash("error", "Failed to fetch cart items");
    res.redirect("/");
  }
});

router.get("/shop", async (req, res) => {
  try {
    let products = await productModel.find();
    req.flash("success", "Products loaded successfully"); 
    res.render("shop", { products, success: req.flash("success") });
  } catch (error) {
    console.error("Error fetching products:", error);
    req.flash("error", "Failed to fetch products"); 
    res.redirect("/"); 
  }
});

router.get("/checkout", isLoggedIn, async (req, res) => {
  try {
    
    let user = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");

    
    let total = user.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    res.render("checkout", { user, total });
  } catch (error) {
    console.error("Error fetching user or cart:", error);
    req.flash("error", "Failed to load checkout page");
    res.redirect("/shop");
  }
});


router.post("/complete-checkout", isLoggedIn, async (req, res) => {
  try {
    
    const { name, address, city, postalCode, phone } = req.body;

    
    let user = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");

    
    
    console.log("Shipping Details:", {
      name,
      address,
      city,
      postalCode,
      phone,
    });
    console.log("Cart Items:", user.cart);

    
    user.cart = [];
    await user.save();

    
    req.flash("success", "Your order has been placed successfully");
    res.redirect("/order-confirmation"); 
  } catch (error) {
    console.error("Error completing checkout:", error);
    req.flash("error", "Failed to complete checkout");
    res.redirect("/checkout");
  }
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    if (!user.cart.includes(req.params.productid)) {
      user.cart.push(req.params.productid);
      await user.save();
      req.flash("success", "Successfully added to cart");
    } else {
      req.flash("error", "Item already in cart");
    }
    res.redirect("/shop");
  } catch (error) {
    console.error("Error adding to cart:", error);
    req.flash("error", "Failed to add item to cart");
    res.redirect("/shop");
  }
});

router.post("/removefromcart/:productid", isLoggedIn, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart = user.cart.filter(
      (item) => item.toString() !== req.params.productid
    );
    await user.save();
    req.flash("success", "Item removed from cart");
    res.redirect("/cart");
  } catch (error) {
    console.error("Error removing from cart:", error);
    req.flash("error", "Failed to remove item from cart");
    res.redirect("/cart");
  }
});

module.exports = router;
