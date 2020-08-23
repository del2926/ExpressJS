const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator");

const Sme = require("../models/sme");

const Customer = require("../models/customer");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getSmeLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/sme-login", {
    path: "/sme-login",
    pageTitle: "Login",
    errorMessage: message,
    oldInput: {
      roc: "",
      password: "",
    },
    validationErrors: [],
  });
};

exports.getCustLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/cust-login", {
    path: "/cust-login",
    pageTitle: "Login",
    errorMessage: message,
    oldInput: {
      email: "",
      password: "",
    },
    validationErrors: [],
  });
};

exports.getSmeRegister = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/sme-register", {
    path: "/sme-register",
    pageTitle: "SME Registration",
    errorMessage: message,
    oldInput: {
      roc: "",
      name: "",
      owner: "",
      phone: "",
      address: "",
      location: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};

exports.getCustRegister = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/cust-register", {
    path: "/cust-register",
    pageTitle: "Customer Registration",
    errorMessage: message,
    oldInput: {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationErrors: [],
  });
};

exports.postSmeLogin = (req, res, next) => {
  const roc = req.body.roc;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/sme-login", {
      path: "/sme-login",
      pageTitle: "Login",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        roc: roc,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }

  Sme.findOne({ roc: roc })
    .then((sme) => {
      if (!sme) {
        return res.status(422).render("auth/sme-login", {
          path: "/sme-login",
          pageTitle: "Login",
          errorMessage: "Invalid ROC Number!",
          oldInput: {
            roc: roc,
            password: password,
          },
          validationErrors: [],
        });
      }
      bcrypt
        .compare(password, sme.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.sme = sme;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          return res.status(422).render("auth/sme-login", {
            path: "/sme-login",
            pageTitle: "Login",
            errorMessage: "Invalid Password!",
            oldInput: {
              roc: roc,
              password: password,
            },
            validationErrors: [],
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/sme-login");
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCustLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/cust-login", {
      path: "/cust-login",
      pageTitle: "Login",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }

  Customer.findOne({ email: email })
    .then((customer) => {
      if (!customer) {
        return res.status(422).render("auth/cust-login", {
          path: "/cust-login",
          pageTitle: "Login",
          errorMessage: "Invalid Email!",
          oldInput: {
            email: email,
            password: password,
          },
          validationErrors: [],
        });
      }
      bcrypt
        .compare(password, customer.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.customer = customer;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          return res.status(422).render("auth/cust-login", {
            path: "/cust-login",
            pageTitle: "Login",
            errorMessage: "Invalid Password!",
            oldInput: {
              email: email,
              password: password,
            },
            validationErrors: [],
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/cust-login");
        });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postSmeRegister = (req, res, next) => {
  const roc = req.body.roc;
  const name = req.body.name;
  const owner = req.body.owner;
  const phone = req.body.phone;
  const address = req.body.address;
  const location = req.body.location;
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("auth/sme-register", {
      path: "/sme-register",
      pageTitle: "SME Registration",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        roc: roc,
        name: name,
        owner: owner,
        phone: phone,
        address: address,
        location: location,
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const sme = new Sme({
        roc: roc,
        name: name,
        owner: owner,
        phone: phone,
        address: address,
        location: location,
        email: email,
        password: hashedPassword,
      });
      return sme.save();
    })
    .then((result) => {
      res.redirect("/sme-login");
      return transporter.sendMail({
        to: email,
        from: "delilah.azahari@gmail.com",
        subject: "AI Snap Registration",
        html: "<h1>You are successfully registered!</h1>",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCustRegister = (req, res, next) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("auth/cust-register", {
      path: "/cust-register",
      pageTitle: "Customer Registration",
      errorMessage: errors.array()[0].msg,
      oldInput: {
        fname: fname,
        lname: lname,
        phone: phone,
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const customer = new Customer({
        fname: fname,
        lname: lname,
        phone: phone,
        email: email,
        password: hashedPassword,
        cart: { items: [] },
      });
      return customer.save();
    })
    .then((result) => {
      res.redirect("/cust-login");
      return transporter.sendMail({
        to: email,
        from: "delilah.azahari@gmail.com",
        subject: "AI Snap Registration",
        html: "<h1>You are successfully registered!</h1>",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    Sme.findOne({ email: req.body.email })
      .then((sme) => {
        if (!sme) {
          req.flash("error", "No account with that email found!");
          return res.redirect("/reset");
        }
        sme.resetToken = token;
        sme.resetTokenExpiration = Date.now() + 3600000;
        return sme.save();
      })
      .then((result) => {
        res.redirect("/");
        transporter.sendMail({
          to: req.body.email,
          from: "delilah.azahari@gmail.com",
          subject: "Password Reset",
          html: `
            <p>You have requested to reset your password.</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
          `,
        });
      })
      .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  Sme.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((sme) => {
      let message = req.flash("error");
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: message,
        smeId: sme._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const smeId = req.body.smeId;
  const passwordToken = req.body.passwordToken;
  let resetSme;

  Sme.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: smeId,
  })
    .then((sme) => {
      resetSme = sme;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetSme.password = hashedPassword;
      resetSme.resetToken = undefined;
      resetSme.resetTokenExpiration = undefined;
      return resetSme.save();
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
