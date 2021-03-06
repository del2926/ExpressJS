const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const session = require("express-session");

const MongoDBStore = require("connect-mongodb-session")(session);

const csrf = require("csurf");

const flash = require("connect-flash");

const multer = require("multer");

const { v4: uuidv4 } = require("uuid");

const errorController = require("./controllers/error");

const Sme = require("./models/sme");

const Customer = require("./models/customer");

const MONGODB_URI =
  "mongodb+srv://Delilah:sitiDel2926@cluster0.9grtz.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.sme) {
    return next();
  }
  Sme.findById(req.session.sme._id)
    .then((sme) => {
      if (!sme) {
        return next();
      }
      req.sme = sme;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
});

app.use((req, res, next) => {
  if (!req.session.customer) {
    return next();
  }
  Customer.findById(req.session.customer._id)
    .then((customer) => {
      if (!customer) {
        return next();
      }
      req.customer = customer;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.isCustomer = req.session.customer;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get("/500", errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  res.redirect("/500");
});

mongoose
  .connect(process.env.MONGODB_URI || MONGODB_URI)
  .then((result) => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
