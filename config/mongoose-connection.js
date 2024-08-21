const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
const config = require("config");

// Construct the MongoDB URI
const dbURI = `${config.get("MONGODB_URI")}/scatch`;

mongoose.connect(dbURI)
  .then(() => {
    dbgr('Connected to MongoDB successfully');
  })
  .catch((err) => {
    dbgr('Error connecting to MongoDB:', err);
  });

module.exports = mongoose.connection;
