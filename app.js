const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", (req, res) => {
  res.send("Hey!!");
});
app.listen(port, () => {
  console.log("App is Listening on Port: " + port);
});
