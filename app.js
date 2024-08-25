const express = require("express");
const app = express();
const port = 3000;
const db = require("./config/mongoose-connection");
const cookieParser = require("cookie-parser");
const path = require("path");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const ownersRouter = require("./routes/ownersRouter");
const homepageRouter = require("./routes/index");
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.set("view engine", "ejs");
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);

app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/", homepageRouter);

app.listen(port, () => {
  console.log("App is Listening on Port: " + port);
});
