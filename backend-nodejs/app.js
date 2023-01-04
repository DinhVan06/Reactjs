var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var CategoriesRouter = require("./routes/categories");
var CustomersRouter = require("./routes/customers");
var EmployeesRouter = require("./routes/employees");
var LoginsRouter = require("./routes/logins");
var OrdersRouter = require("./routes/orders");
var ProductsRouter = require("./routes/products");
var SlidersRouter = require("./routes/sliders");
var SuppliersRouter = require("./routes/suppliers");
var FeaturesRouter = require("./routes/features");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/categories", CategoriesRouter);
app.use("/customers", CustomersRouter);
app.use("/employees", EmployeesRouter);
app.use("/logins", LoginsRouter);
app.use("/orders", OrdersRouter);
app.use("/products", ProductsRouter);
app.use("/sliders", SlidersRouter);
app.use("/suppliers", SuppliersRouter);
app.use("/fearutes", FeaturesRouter);

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
