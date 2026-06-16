import {
    useEffect,
    useState
} from "react";

import {
    getMandiRates
} from "../../services/mandiService";

function MandiRateCard() {

    const [rates, setRates] =
    useState([]);

    const [filteredRates,
        setFilteredRates
    ] =
    useState([]);

    const [loading, setLoading] =
    useState(true);

    // SEARCH STATES
    const [cropSearch,
        setCropSearch
    ] =
    useState("");

    const [locationSearch,
        setLocationSearch
    ] =
    useState("");

    // FETCH DATA
    useEffect(() => {

        fetchRates();

    }, []);

    const fetchRates =
        async() => {

            const data =
                await getMandiRates();

            setRates(data);

            setFilteredRates(data);

            setLoading(false);

        };

    // FILTER DATA
    useEffect(() => {

        const filtered =
            rates.filter((item) => {

                const cropMatch =
                    item.commodity.toLowerCase()
                    .includes(
                        cropSearch.toLowerCase()
                    );

                const locationMatch =
                    item.market.toLowerCase()
                    .includes(
                        locationSearch.toLowerCase()
                    );

                return (
                    cropMatch &&
                    locationMatch
                );

            });

        setFilteredRates(filtered);

    }, [

        cropSearch,
        locationSearch,
        rates

    ]);

    return (

        <
        div className = "mandi-section" >

        <
        h2 > 📈Live Mandi Rates <
        /h2>

        { /* SEARCH FILTERS */ } <
        div className = "mandi-filters" >

        { /* CROP SEARCH */ } <
        input type = "text"

        placeholder =
        "Search crop name..."

        value = { cropSearch }

        onChange = {
            (e) =>
            setCropSearch(
                e.target.value
            )
        }
        />

        { /* LOCATION SEARCH */ } <
        input type = "text"

        placeholder =
        "Search mandi location..."

        value = { locationSearch }

        onChange = {
            (e) =>
            setLocationSearch(
                e.target.value
            )
        }
        />

        <
        /div>

        { /* LOADING */ } {
            loading ? (

                <
                p >
                Loading mandi data... <
                /p>

            ) : (

                <
                div className = "mandi-grid" >

                {
                    filteredRates.length > 0 ?
                    (

                        filteredRates.map(
                            (item, index) => (

                                <
                                div key = { index }
                                className = "mandi-card" >

                                <
                                h3 > 🌾{ " " } { item.commodity } <
                                /h3>

                                <
                                p > 📍{ " " } { item.market } <
                                /p>

                                <
                                p >
                                State: { " " } { item.state } <
                                /p>

                                <
                                p >
                                Min Price: { " " }₹ { item.min_price } <
                                /p>

                                <
                                p >
                                Modal Price: { " " }₹ { item.modal_price } <
                                /p>

                                <
                                p >
                                Max Price: { " " }₹ { item.max_price } <
                                /p>

                                <
                                p >
                                Variety: { " " } { item.variety } <
                                /p>

                                <
                                /div>

                            ))

                    ) : (

                        <
                        p >
                        No mandi data found <
                        /p>

                    )
                }

                <
                /div>

            )
        }

        <
        /div>
    );
}



export default MandiRateCard;