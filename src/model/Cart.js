const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cart = new Schema(
  {
    id: { type: String },
    userId: { type: String },
    productId: { type: String },
  },
  { collection: "cart" }
);

module.exports = mongoose.model("cart", Cart);
