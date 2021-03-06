const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
  },
  smeId: {
    type: Schema.Types.ObjectId,
    ref: "Sme",
    required: true,
  },
  smeName: {
    type: Schema.Types.String,
    ref: "Sme",
    required: true,
  },
  smeLocation: {
    type: Schema.Types.String,
    ref: "Sme",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
