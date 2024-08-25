const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "Something went wrong re");
   return res.redirect("/");
  }
  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "Something went wrong");
    return res.redirect("/");
  }
};
