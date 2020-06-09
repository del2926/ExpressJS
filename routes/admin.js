const path = require("path");

const express = require("express");

// const rootDir = require("../util/path");

const productsController = require("../controllers/products");

const adminData = require("./admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productsController.getAddProduct);
// console.log("In another middleware!");
// res.send(
//   '<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
// res.sendFile(path.join(rootDir, "views", "add-product.html"));

// /admin/add-product => POST
router.post("/add-product", productsController.postAddProduct);
// console.log(req.body);

module.exports = router;

// exports.routes = router;
// exports.products = products;
