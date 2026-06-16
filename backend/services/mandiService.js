const axios = require("axios");

const API_KEY = process.env.DATA_GOV_API_KEY;

exports.getMandiRates = async(crop = "", state = "") => {
    try {
        const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070`;

        const response = await axios.get(url, {
            params: {
                "api-key": API_KEY,
                format: "json",
                limit: 50,
                "filters.commodity": crop || undefined,
                "filters.state": state || undefined
            }
        });

        const records = response.data.records;

        // Clean + map data
        return records.map(r => ({
            crop: r.commodity,
            price: r.modal_price,
            minPrice: r.min_price,
            maxPrice: r.max_price,
            market: r.market,
            state: r.state,
            date: r.arrival_date
        }));

    } catch (err) {
        console.error("Mandi API Error:", err.message);
        return [];
    }
    let cache = {};

    if (cache[key] && Date.now() - cache[key].time < 600000) {
        return cache[key].data;
    }
};