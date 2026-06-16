const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");

// SEND MESSAGE
router.post("/", async(req, res) => {

    try {

        const { name, email, message } = req.body;

        // validation
        if (!name || !email || !message) {
            return res.status(400).json({
                msg: "All fields are required"
            });
        }

        // save in mongodb
        const newMessage = await Contact.create({
            name,
            email,
            message
        });

        res.status(201).json({
            msg: "Message sent successfully",
            data: newMessage
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            msg: "Server Error"
        });

    }

});

module.exports = router;