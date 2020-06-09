const path = require("path");

const express = require("express");

// const rootDir = require("../util/path");
// const adminData = require("./admin");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/", productsController.getProducts);
// console.log(adminData.products);
// res.sendFile(path.join(rootDir, "views", "shop.html"));

// console.log("In another middleware!");
// res.send("<h1>Hello from Express!</h1>");

module.exports = router;
