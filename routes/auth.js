const express = require("express");

const { check, body } = require("express-validator");

const authController = require("../controllers/auth");

const Sme = require("../models/sme");

const Customer = require("../models/customer");

const router = express.Router();

router.get("/sme-login", authController.getSmeLogin);

router.get("/cust-login", authController.getCustLogin);

router.get("/sme-register", authController.getSmeRegister);

router.get("/cust-register", authController.getCustRegister);

router.post(
  "/sme-login",
  [
    body("password", "Invalid Password!")
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postSmeLogin
);

router.post(
  "/cust-login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),

    body("password", "Invalid Password!")
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postCustLogin
);

router.post(
  "/sme-register",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return Sme.findOne({ email: value }).then((smeDoc) => {
          if (smeDoc) {
            return Promise.reject("E-Mail already exists!");
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only letters and numbers and at least 6 characters."
    )
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password does not match!");
        }
        return true;
      }),
  ],
  authController.postSmeRegister
);

router.post(
  "/cust-register",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return Customer.findOne({ email: value }).then((customerDoc) => {
          if (customerDoc) {
            return Promise.reject("E-Mail already exists!");
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only letters and numbers and at least 6 characters."
    )
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password does not match!");
        }
        return true;
      }),
  ],
  authController.postCustRegister
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
