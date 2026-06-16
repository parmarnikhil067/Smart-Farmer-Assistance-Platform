const Product = require("../models/Product");
const Order = require("../models/Order");
const { getMandiRates } = require("../services/mandiService");

exports.getDashboard = async(req, res) => {
    const userId = req.user.id;

    // My crops
    const crops = await Product.find({ farmer: userId });

    // Orders
    const orders = await Order.find().populate("product");

    const myOrders = orders.filter(
        o => o.product.farmer.toString() === userId
    );

    // Mandi rates
    const mandiRates = await getMandiRates();

    res.json({
        totalCrops: crops.length,
        totalOrders: myOrders.length,
        crops,
        orders: myOrders,
        mandiRates
    });
};