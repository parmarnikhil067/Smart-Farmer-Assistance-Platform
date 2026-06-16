import "./Aboutportal.css";

function AboutPortal() {
    return ( <
        div className = "about-portal" >

        <
        h1 > 🌾About Smart Farmer Assistance Portal < /h1>

        <
        p >
        Smart Farmer Assistance Portal is a MERN Stack based platform designed to connect farmers and buyers directly. <
        /p>

        <
        div className = "portal-features" >

        <
        div className = "feature-card" >
        <
        h3 > 🌾Marketplace < /h3> <
        p > Buy and sell crops directly. < /p> < /
        div >

        <
        div className = "feature-card" >
        <
        h3 > 💬Chat System < /h3> <
        p > Real - time communication between farmers and buyers. < /p> < /
        div >

        <
        div className = "feature-card" >
        <
        h3 > 📈AI Prediction < /h3> <
        p > Crop price forecasting and market insights. < /p> < /
        div >

        <
        div className = "feature-card" >
        <
        h3 > 🌦Weather Updates < /h3> <
        p > Location - based weather information. < /p> < /
        div >

        <
        /div>

        <
        div className = "portal-info" >
        <
        h2 > Our Mission < /h2>

        <
        p >
        To empower farmers with technology, market access,
        AI - powered insights, and transparent communication. <
        /p> < /
        div >

        <
        /div>
    );
}

export default AboutPortal;