const Message = require("../models/Message");
exports.send = async(req, res) => {
    const m = await Message.create(req.body);
    res.json(m);
};
exports.get = async(req, res) => {
    const msgs = await Message.find({ receiver: req.params.id });
    res.json(msgs);
};