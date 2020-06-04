const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
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
  res.status(404).sendFile(path.join(__dirname, "views", "error.html"));
});

app.listen(3000);
