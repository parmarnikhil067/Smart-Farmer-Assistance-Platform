const Order = require("../models/Order");
exports.create = async(req, res) => {
    const o = await Order.create({...req.body, buyer: req.user.id });
    res.json(o);
};
exports.getAll = async(req, res) => {
    const data = await Order.find().populate("product buyer");
    res.json(data);
};