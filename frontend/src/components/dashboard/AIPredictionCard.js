import {

    ResponsiveContainer,

    LineChart,

    Line,

    XAxis,

    YAxis,

    Tooltip,

    CartesianGrid

} from "recharts";

function AIPredictionCard() {

    // SAMPLE WEEKLY DATA
    const data = [

        {
            day: "Mon",
            wheat: 2200
        },

        {
            day: "Tue",
            wheat: 2350
        },

        {
            day: "Wed",
            wheat: 2450
        },

        {
            day: "Thu",
            wheat: 2550
        },

        {
            day: "Fri",
            wheat: 2700
        },

        {
            day: "Sat",
            wheat: 2600
        },

        {
            day: "Sun",
            wheat: 2800
        }

    ];

    return (

        <
        div className = "weekly-chart" >

        <
        h2 > 📈Weekly AI Price Prediction <
        /h2>

        <
        ResponsiveContainer width = "100%"
        height = { 350 } >

        <
        LineChart data = { data } >

        <
        CartesianGrid strokeDasharray = "3 3" /
        >

        <
        XAxis dataKey = "day" / >

        <
        YAxis / >

        <
        Tooltip / >

        <
        Line type = "monotone"
        dataKey = "wheat"
        strokeWidth = { 3 }
        />

        <
        /LineChart>

        <
        /ResponsiveContainer>

        <
        /div>
    );
}

export default AIPredictionCard;