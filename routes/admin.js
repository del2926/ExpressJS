const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const adminData = require("./admin");

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    productCSS: true,
    formCSS: true,
  });
  // console.log("In another middleware!");
  // res.send(
  //   '<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  // console.log(req.body);
  res.redirect("/");
});

// module.exports = router;

exports.routes = router;
exports.products = products;
