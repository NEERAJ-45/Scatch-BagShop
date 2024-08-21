const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

  res.send("Kuch toh Buy kar le bsdk");
});

module.exports = router;
