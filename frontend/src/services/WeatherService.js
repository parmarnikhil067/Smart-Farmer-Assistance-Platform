import axios from "axios";

const API_KEY =
    "1af11f9e258faf58309a91607d5f1845";

// CITY WEATHER
export const getWeatherData =
    async(city = "Bhopal") => {

        try {

            const res = await axios.get(

                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

            );

            return res.data;

        } catch (err) {

            console.log(err);

            return null;

        }

    };

// LOCATION WEATHER
export const getWeatherByCoords =
    async(lat, lon) => {

        try {

            const res = await axios.get(

                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

            );

            return res.data;

        } catch (err) {

            console.log(err);

            return null;

        }

    };