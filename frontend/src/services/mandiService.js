import axios from "axios";

const API_KEY =
    "579b464db66ec23bdd00000150dc2b4685c341624449e0dae6197c41";

// REAL MANDI DATA
export const getMandiRates =
    async() => {

        try {

            const res = await axios.get(

                `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=20`

            );

            return res.data.records;

        } catch (err) {

            console.log(err);

            return [];

        }

    };