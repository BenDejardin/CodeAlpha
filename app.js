var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var stylus = require("stylus");

const mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var utilisateursRouter = require("./routes/utilisateurs");
var createqrRouter = require("./routes/createqr");
var apiRouter = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/utilisateurs", utilisateursRouter);
app.use("/createqr", createqrRouter);
app.use("/api", apiRouter);

// Configuration de mongoose
mongoose.connect("mongodb://localhost/QRCodes", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
let mdb = mongoose.connection;
mdb.on("error", console.error.bind(console, "connection error:"));
mdb.once("open", function () {
  console.log("Connection Mongoose ok !");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
