import {
    useEffect,
    useState
} from "react";

import {

    getWeatherData,

    getWeatherByCoords

} from "../../services/WeatherService";

function WeatherCard() {

    const [weather, setWeather] =
    useState(null);

    const [city, setCity] =
    useState("");

    const [loading, setLoading] =
    useState(true);

    // AUTO LOCATION WEATHER
    useEffect(() => {

        getCurrentLocation();

    }, []);

    // GET USER LOCATION
    const getCurrentLocation = () => {

        if (
            navigator.geolocation
        ) {

            navigator.geolocation.getCurrentPosition(

                async(position) => {

                    const lat =
                        position.coords.latitude;

                    const lon =
                        position.coords.longitude;

                    const data =
                        await getWeatherByCoords(
                            lat,
                            lon
                        );

                    setWeather(data);

                    setLoading(false);

                },

                async() => {

                    // FALLBACK CITY
                    const data =
                        await getWeatherData(
                            "Bhopal"
                        );

                    setWeather(data);

                    setLoading(false);

                }

            );

        }

    };

    // SEARCH WEATHER
    const fetchWeather =
        async() => {

            if (!city) return;

            setLoading(true);

            const data =
                await getWeatherData(city);

            setWeather(data);

            setLoading(false);

        };

    return (

        <
        div className = "weather-card" >

        <
        h2 > 🌦Live Weather <
        /h2>

        { /* SEARCH */ } <
        div className = "weather-search" >

        <
        input type = "text"

        placeholder = "Search city"

        value = { city }

        onChange = {
            (e) =>
            setCity(e.target.value)
        }
        />

        <
        button onClick = { fetchWeather } >
        Search <
        /button>

        <
        /div>

        {
            loading ? (

                <
                p >
                Loading weather... <
                /p>

            ) : weather ? (

                <
                div className = "weather-info" >

                <
                h1 > { weather.main.temp }°
                C <
                /h1>

                <
                p > {
                    weather.weather[0]
                    .main
                } <
                /p>

                <
                span > 📍{ " " } { weather.name } <
                /span>

                <
                br / >

                <
                span > 💧Humidity: { " " } { weather.main.humidity } %
                <
                /span>

                <
                br / >

                <
                span > 🌬Wind: { " " } { weather.wind.speed } { " " }
                km / h <
                /span>

                <
                /div>

            ) : (

                <
                p >
                Weather not found <
                /p>

            )
        }

        <
        /div>
    );
}

export default WeatherCard;