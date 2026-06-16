// routes/cropRoutes.js
const router = require("express").Router();

router.get("/", (req, res) => {
    res.json([
        { name: "Wheat", category: "Grain" },
        { name: "Rice", category: "Grain" },
        { name: "Maize", category: "Grain" },
        { name: "Soybean", category: "Oilseed" },
        { name: "Cotton", category: "Cash Crop" },
        { name: "Potato", category: "Vegetable" }
    ]);
});

module.exports = router;