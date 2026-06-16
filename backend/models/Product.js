const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: String,

    cropType: {
        type: String,
        enum: ["Wheat", "Rice", "Maize", "Soybean", "Cotton"]
    },

    quality: {
        type: String,
        enum: ["A", "B", "C"],
        default: "A"
    },

    price: Number,
    quantity: Number,
    location: String,

    mandiPrice: Number, // store latest mandi rate

    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);