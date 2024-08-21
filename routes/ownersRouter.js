const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");


router.get("/", (req, res) => {
  res.send("Hey Owner");
});


router.post("/create", async (req, res) => {
  try {
    
    let owners = await ownerModel.find();
    
    if (owners.length > 0) {
      return res.status(500).send("You don't have permission to create a new user!!");
    }

    
    let { fullName, email, password } = req.body;

    
    let createdOwner = await ownerModel.create({
      fullName,
      email,
      password,
    });

    
    res.status(201).send(createdOwner);

  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
});

module.exports = router;
