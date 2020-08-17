const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const smeSchema = new Schema({
  roc: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

module.exports = mongoose.model("Sme", smeSchema);
