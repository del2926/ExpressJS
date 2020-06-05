const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const expressHbs = require("express-handlebars");

const app = express();

// app.engine(
//   "handlebars",
//   expressHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "handlebars",
//   })
// );

app.set("view engine", "ejs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

// app.use((req, res, next) => {
//   console.log("In the middleware!");
//   next(); // Allows the request to continue to the next middleware in line
// });

// app.use("/", (req, res, next) => {
//   console.log("This always runs!");
//   next();
// });

app.use((req, res, next) => {
  // res.status(404).send("<h1>Page Not Found</h1>");
  res.status(404).render("error", { pageTitle: "Error Page", path: "" });
});

app.listen(3000);
