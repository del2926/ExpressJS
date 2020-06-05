const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", {
    prods: products,
    pageTitle: "My Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  // console.log("In another middleware!");
  // res.send("<h1>Hello from Express!</h1>");
});

module.exports = router;
