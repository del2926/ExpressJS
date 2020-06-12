const path = require("path");

const express = require("express");

// const rootDir = require("../util/path");

const adminController = require("../controllers/admin");

// const adminData = require("./admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/products => GET
router.get("/products", adminController.getProducts);
// console.log("In another middleware!");
// res.send(
//   '<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
// res.sendFile(path.join(rootDir, "views", "add-product.html"));

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);
// console.log(req.body);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;

// exports.routes = router;
// exports.products = products;
