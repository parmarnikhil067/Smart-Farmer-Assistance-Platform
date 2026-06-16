const Product = require("../models/Product");
exports.create = async(req, res) => {
    const p = await Product.create({...req.body, farmer: req.user.id });
    res.json(p);
};
exports.getAll = async(req, res) => {
    const data = await Product.find().populate("farmer", "name");
    res.json(data);
};

// 🔍 Search products (by name, location)
exports.search = async(req, res) => {
    const { keyword } = req.query;

    const query = keyword ?
        {
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } }
            ]
        } :
        {};

    const results = await Product.find(query).populate("farmer", "name");
    res.json(results);
};