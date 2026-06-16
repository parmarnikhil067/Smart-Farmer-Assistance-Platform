const router = require("express").Router();
const { getMandiRates } = require("../services/mandiService");

router.get("/", async(req, res) => {
    const { crop, state } = req.query;

    const data = await getMandiRates(crop, state);
    res.json(data);
});

module.exports = router;