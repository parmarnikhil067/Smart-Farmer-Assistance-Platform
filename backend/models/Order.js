const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    status: { type: String, default: "pending" }
}, { timestamps: true });
module.exports = mongoose.model("Order", orderSchema);