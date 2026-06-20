// SMART FARMER PLATFORM - FULL FRONTEND (PRODUCTION STYLE, NO TAILWIND)
// Features: Auth, Marketplace, Chat, Dashboard UI, Routing, API integration

import React, { useEffect, useState, createContext, useContext, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import "./App.css";
import { useParams } from "react-router-dom";
import ActivityCard from './components/dashboard/ActivityCard'
import DashboardCard from './components/dashboard/DashboardCard'
import AIPredictionCard from './components/dashboard/AIPredictionCard'
import WeatherCard from './components/dashboard/WeatherCard'
import MandiRateCard from './components/dashboard/MandiRateCard'
// import {
//     getDashboardStats
// } from "./services/dashboardService";
import MarketplaceStore from './pages/MarketplaceStore'
import Chat from './pages/Chatpage'
import AboutPortal from './pages/AboutPortal'
import TermsPolicies from './pages/TermsPolicies'
import Feedback from './pages/Feedback'
import './pages/Navbar.css'



// ================= API =================
const API = axios.create({ baseURL: "https://smart-farmer-backend-p2ap.onrender.com/api" });
// const socket = io("http://localhost:5000");

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});


// ================= LANGUAGE CONTEXT =================
const LanguageContext =
    createContext();
const useLanguage = () =>
    useContext(LanguageContext);

const LanguageProvider = ({ children }) => {

    const [language, setLanguage] =
    useState("en");

    const translations = {

        en: {

            home: "Home",
            dashboard: "Dashboard",
            marketplace: "Marketplace",
            chat: "Chat",
            about: "About",
            contact: "Contact",
            help: "Help",
            login: "Login",
            register: "Register",
            logout: "Logout",

            heroTitle: "Smart Farmer Assistance Platform",

            heroText: "Sell crops online, check mandi prices, and connect with buyers.",

            contactTitle: "Contact Us",

            helpTitle: "Help Center",

            aboutTitle: "About Smart Farmer Platform"

        },

        hi: {

            home: "होम",
            dashboard: "डैशबोर्ड",
            marketplace: "मार्केटप्लेस",
            chat: "चैट",
            about: "हमारे बारे में",
            contact: "संपर्क",
            help: "सहायता",
            login: "लॉगिन",
            register: "रजिस्टर",
            logout: "लॉगआउट",

            heroTitle: "स्मार्ट फार्मर सहायता प्लेटफॉर्म",

            heroText: "ऑनलाइन फसल बेचें, मंडी भाव देखें और खरीदारों से जुड़ें।",

            contactTitle: "संपर्क करें",

            helpTitle: "सहायता केंद्र",

            aboutTitle: "स्मार्ट फार्मर प्लेटफॉर्म के बारे में"

        }


    };

    return (

        <
        LanguageContext.Provider value = {
            {
                language,
                setLanguage,
                t: translations[language]
            }
        } >

        { children }

        <
        /LanguageContext.Provider>

    );
};

// ================= AUTH CONTEXT =================
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);



    const login = async(data) => {
        const res = await API.post("/auth/login", data);
        localStorage.setItem("token", res.data.token);
        setUser(res.data);
    };

    const register = async(data) => {
        const res = await API.post("/auth/register", data);
        localStorage.setItem("token", res.data.token);
        setUser(res.data);
    };

    // LOGOUT (FULL FIX)
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };
    return ( < AuthContext.Provider value = {
            { user, login, register, logout }
        } > { children } < /AuthContext.Provider>

    );
}

function PrivateRoute({ children }) {
    const { user } = useAuth();
    return user ? children : < Navigate to = "/login" / > ;
}

// ================= LOGIN =================
function Login() {
    const { login } = useAuth();
    const nav = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const submit = async() => {
        await login(form);
        nav("/");
    };


    return ( <
        div className = "auth" >
        <
        h2 > Login < /h2> <
        input placeholder = "Email"
        onChange = {
            (e) => setForm({...form, email: e.target.value })
        }
        /> <
        input type = "password"
        placeholder = "Password"
        onChange = {
            (e) => setForm({...form, password: e.target.value })
        }
        /> <
        button onClick = { submit } > Login < /button> <
        Link to = "/register" > Create Account < /Link> < /
        div >
    );
}

// ================= REGISTER =================
function Register() {
    const { register } = useAuth();
    const nav = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const submit = async() => {
        await register(form);
        nav("/");
    };


    return ( <
        div className = "auth" >
        <
        h2 > Register < /h2> <
        input placeholder = "Name"
        onChange = {
            (e) => setForm({...form, name: e.target.value })
        }
        /> <
        input placeholder = "Email"
        onChange = {
            (e) => setForm({...form, email: e.target.value })
        }
        /> <
        input type = "password"
        placeholder = "Password"
        onChange = {
            (e) => setForm({...form, password: e.target.value })
        }
        /> 

        <
        button onClick = { submit } > Register < /button> < /
        div >
    );
}

// ========== DASHBOARD PAGE ========

function Dashboard() {
    // const [rates, setRates] =
    // useState([]);


    const activities = [

        "Uploaded Wheat crop",

        "Buyer messaged you",

        "Price alert updated"

    ];

    return (

        <
        div className = "dashboard-page" >

        { /* TOP HEADER */ } <
        div className = "dashboard-header" >

        <
        div >

        <
        h1 > 🌾Farmer Dashboard <
        /h1>

        <
        p >
        Welcome back farmer👋 <
        /p>

        <
        /div>

        <
        img src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854"
        alt = "farmer" /
        >

        <
        /div>



        <
        div className = "stats-grid" >

        <
        DashboardCard title = "Total Crops"
        value = "14" /
        >

        <
        DashboardCard title = "Marketplace Orders"
        value = "5" /
        >

        <
        DashboardCard title = "Total Earnings"
        value = "$125000" / >

        <
        DashboardCard title = "Buyers Connected"
        value = "21" / >

        <
        /div>

        { /* MAIN GRID */ } <
        div className = "dashboard-grid" >

        { /* WEATHER */ } <
        WeatherCard / >

        { /* AI PREDICTION */ } <
        AIPredictionCard /
        >

        <
        /div>

        <
        MandiRateCard /
        >


        <
        div className = "activity-section" >

        <
        h2 > 🕒Recent Activity <
        /h2>

        <
        div className = "activity-grid" >

        {
            activities.map((item, index) => (

                <
                ActivityCard key = { index }
                text = { item }
                />

            ))
        }

        <
        /div>

        <
        /div>

        <
        /div>
    );
}


// ================= MANDIRATES =================
function MandiRates() {
    const [rates, setRates] = useState([]);
    const [crop, setCrop] = useState("");
    const [state, setState] = useState("");

    const fetchRates = async() => {
        const res = await API.get(`/mandi?crop=${crop}&state=${state}`);
        setRates(res.data);
    };

    useEffect(() => {
        fetchRates();
    }, []);

    return ( <
        div >
        <
        h2 > Mandi Prices < /h2>

        { /* Filters */ } <
        input placeholder = "Crop"
        onChange = { e => setCrop(e.target.value) }
        /> <
        input placeholder = "State"
        onChange = { e => setState(e.target.value) }
        /> <
        button onClick = { fetchRates } > Search < /button>

        { /* Table */ } <
        table >
        <
        thead >
        <
        tr >
        <
        th > Crop < /th> <
        th > Price < /th> <
        th > Market < /th> <
        th > State < /th> < /
        tr > <
        /thead> <
        tbody > {
            rates.map((r, i) => ( <
                tr key = { i } >
                <
                td > { r.crop } < /td> <
                td > ₹{ r.price } < /td> <
                td > { r.market } < /td> <
                td > { r.state } < /td> < /
                tr >
            ))
        } <
        /tbody> < /
        table > <
        /div>
    );
}



// ================= PRODUCTDETAILS =================
function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        API.get(`/products/${id}`).then(res => setProduct(res.data));
    }, [id]);

    const buyNow = async() => {
        await API.post("/orders", {
            product: product._id,
            quantity: 1
        });
        alert("Order placed!");
    };

    if (!product) return <div > Loading... < /div>;

    return ( <
        div className = "product-details" >
        <
        img src = { product.image || "" }
        / > <
        h2 > { product.name } < /h2> <
        p > ₹{ product.price } < /p> <
        p > { product.location } < /p>

        <
        button onClick = { buyNow } > Buy Now < /button> < /
        div >
    );
}

// ================= ADDPRODUCT =================
function AddProduct() {
    const [crops, setCrops] = useState([]);
    const [form, setForm] = useState({});

    useEffect(() => {
        API.get("/crops").then(res => setCrops(res.data));
    }, []);

    return ( <
            div className = "form" >
            <
            h2 > Add Crop < /h2>

            { /* Crop Dropdown */ } <
            select onChange = { e => setForm({...form, cropType: e.target.value }) } >
            <
            option > Select Crop < /option> {
            crops.map(c => ( <
                option key = { c.name } > { c.name } < /option>
            ))
        } <
        /select>

    { /* Quality */ } <
    select onChange = { e => setForm({...form, quality: e.target.value }) } >
        <
        option > A < /option> <
    option > B < /option> <
    option > C < /option> < /
    select >

        <
        input placeholder = "Price"
    onChange = { e => setForm({...form, price: e.target.value }) }
    /> <
    button onClick = {
        () => API.post("/products", form)
    } > Add < /button> < /
    div >
);
}


// ================= HOMEPAGE =================

function Home() {
    const { t } = useLanguage();
    return ( <
        div className = "home" >

        { /* HERO SECTION */ } <
        div className = "hero" >
        <
        div className = "overlay" >

        <
        h1 > { t.heroTitle } < /h1> 

        <
        p > { t.heroText } <
        /p>

        <
        div className = "buttons" >
        <
        Link to = "/market" >
        <
        button > Go to { t.marketplace } < /button> < /
        Link >

        <
        Link to = "/dashboard" >
        <
        button className = "secondary" > { t.dashboard } < /button> < /
        Link > <
        /div> < /
        div > <
        /div>

        { /* FEATURES */ } <
        div className = "features" >
        <
        h2 > Our Services < /h2>

        <
        div className = "feature-grid" >
        <
        div className = "feature-card" >
        <
        h3 > 🌾Sell Crops < /h3> <
        p > Farmers can sell crops directly without middlemen < /p> < /
        div >

        <
        div className = "feature-card" >
        <
        h3 > 📊Mandi Rates < /h3> <
        p > Get real - time mandi prices across India < /p> < /
        div >

        <
        div className = "feature-card" >
        <
        h3 > 💬Chat System < /h3> <
        p > Connect buyers and farmers instantly < /p> < /
        div > <
        /div> < /
        div >

        <
        /div>
    );
}


// ================= ABOUTPAGE =================
function About() {

    // LANGUAGE STATE
    const [language, setLanguage] = useState("en");
    const { t } = useLanguage()

    // CONTENT
    const content = {

        en: {
            title: "About Smart Farmer Platform",

            desc: "A modern MERN Stack platform designed to help farmers sell crops online, check mandi prices, and connect directly with buyers.",

            missionTitle: "🌾 Our Mission",

            missionText: "Smart Farmer Assistance Platform aims to solve real-world farming problems using technology and digital connectivity.",

            featureTitle: "🚀 Key Features",

            features: [
                "🌾 Crop Marketplace",
                "📊 Live Mandi Rates",
                "💬 Real-Time Chat System",
                "🤖 AI Chatbot Support",
                "🔐 Authentication System",
                "👨‍🌾 Farmer & Buyer Roles"
            ],

            techTitle: "🛠 Technologies Used",

            footerTitle: "🌱 Empowering Farmers Through Technology",

            footerText: "Helping farmers grow digitally and connect directly with buyers."
        },

        hi: {
            title: "स्मार्ट फार्मर प्लेटफॉर्म के बारे में",

            desc: "यह एक आधुनिक MERN Stack प्लेटफॉर्म है जो किसानों को फसल बेचने, मंडी भाव देखने और खरीदारों से जुड़ने में मदद करता है।",

            missionTitle: "🌾 हमारा उद्देश्य",

            missionText: "स्मार्ट फार्मर प्लेटफॉर्म तकनीक के माध्यम से किसानों की वास्तविक समस्याओं का समाधान करता है।",

            featureTitle: "🚀 मुख्य सुविधाएँ",

            features: [
                "🌾 फसल मार्केटप्लेस",
                "📊 लाइव मंडी भाव",
                "💬 रियल-टाइम चैट सिस्टम",
                "🤖 AI चैटबॉट सपोर्ट",
                "🔐 लॉगिन सिस्टम",
                "👨‍🌾 किसान और खरीदार रोल"
            ],

            techTitle: "🛠 उपयोग की गई टेक्नोलॉजी",

            footerTitle: "🌱 तकनीक के माध्यम से किसानों को सशक्त बनाना",

            footerText: "किसानों को डिजिटल रूप से आगे बढ़ाने और खरीदारों से जोड़ने का प्रयास।"
        }

    };

    const data = content[language];

    return ( <
        div className = "about-page" >

        { /* LANGUAGE SWITCH */ } <
        div className = "language-bar" >

        <
        button onClick = {
            () => setLanguage("en")
        }
        className = { language === "en" ? "active-lang" : "" } >
        English <
        /button>

        <
        button onClick = {
            () => setLanguage("hi")
        }
        className = { language === "hi" ? "active-lang" : "" } >
        हिंदी <
        /button>

        <
        /div>

        { /* HERO */ } <
        div className = "about-hero" >

        <
        h1 > { t.aboutTitle } < /h1>

        <
        p > { data.desc } < /p>

        <
        /div>

        { /* CONTENT */ } <
        div className = "about-container" >

        { /* LEFT */ } <
        div className = "about-card" >

        <
        h2 > { data.missionTitle } < /h2>

        <
        p > { data.missionText } < /p>

        <
        /div>

        { /* RIGHT */ } <
        div className = "about-card" >

        <
        h2 > { data.featureTitle } < /h2>

        <
        ul >

        {
            data.features.map((item, index) => ( <
                li key = { index } > { item } <
                /li>
            ))
        }

        <
        /ul>

        <
        /div>

        <
        /div>

        { /* TECH */ } <
        div className = "tech-section" >

        <
        h2 > { data.techTitle } < /h2>

        <
        div className = "tech-grid" >

        <
        div className = "tech-box" > React.js < /div>

        <
        div className = "tech-box" > Node.js < /div>

        <
        div className = "tech-box" > Express.js < /div>

        <
        div className = "tech-box" > MongoDB < /div>

        <
        div className = "tech-box" > Socket.io < /div>

        <
        div className = "tech-box" > Gemini AI API < /div>

        <
        /div>

        <
        /div>

        { /* FOOTER */ } <
        div className = "about-footer" >

        <
        h2 > { data.footerTitle } < /h2>

        <
        p > { data.footerText } < /p>

        <
        /div>

        <
        /div>
    );
}
// ================= CONTACTPAGE =================
function Contact() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });
    const { t } = useLanguage();

    const handleSubmit = async(e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:5000/api/contact",
                form
            );

            alert(res.data.msg);

            setForm({
                name: "",
                email: "",
                message: ""
            });

        } catch (err) {

            alert("Failed to send message");

        }

    };

    return ( <
        div className = "contact-page" >

        { /* HERO */ } <
        div className = "contact-hero" >

        <
        h1 > { t.contactTitle } < /h1>

        <
        p >
        Need help ? Reach out to Smart Farmer Support. <
        /p>

        <
        /div>

        { /* CONTENT */ } <
        div className = "contact-container" >

        { /* LEFT SIDE */ } <
        div className = "contact-info" >

        <
        h2 > Get In Touch < /h2>

        <
        p > 🌾Smart Farmer Assistance Platform helps farmers connect with buyers and access mandi information easily. <
        /p>

        <
        div className = "info-box" >
        <
        h3 > 📧Email < /h3> <
        p > support @smartfarmer.com < /p> < /
        div >

        <
        div className = "info-box" >
        <
        h3 > 📞Phone < /h3> <
        p > +91 9876543210 < /p> < /
        div >

        <
        div className = "info-box" >
        <
        h3 > 📍Address < /h3> <
        p > Bhopal, Madhya Pradesh, India < /p> < /
        div >

        <
        /div>

        { /* RIGHT SIDE */ } <
        div className = "contact-form-box" >

        <
        h2 > Send Message < /h2>

        <
        form onSubmit = { handleSubmit } >

        <
        input type = "text"
        placeholder = "Your Name"
        value = { form.name }
        onChange = {
            (e) =>
            setForm({
                ...form,
                name: e.target.value
            })
        }
        required /
        >

        <
        input type = "email"
        placeholder = "Your Email"
        value = { form.email }
        onChange = {
            (e) =>
            setForm({
                ...form,
                email: e.target.value
            })
        }
        required /
        >

        <
        textarea rows = "6"
        placeholder = "Your Message"
        value = { form.message }
        onChange = {
            (e) =>
            setForm({
                ...form,
                message: e.target.value
            })
        }
        required /
        >

        <
        button type = "submit" >
        Send Message <
        /button>

        <
        /form>

        <
        /div>

        <
        /div>

        <
        /div>
    );
}
// ================= HELPPAGE =================
function Help() {
    const [openIndex, setOpenIndex] = useState(null);
    const [search, setSearch] = useState("");
    const [showChatBot, setShowChatBot] = useState(false);
    const { t } = useLanguage();

    const faqs = [{
            question: "How can farmers sell crops?",
            answer: "Farmers can upload crop details, set prices, and connect directly with buyers."
        },

        {
            question: "How can buyers contact farmers?",
            answer: "Buyers can use the real-time chat system inside the platform."
        },

        {
            question: "How are mandi prices updated?",
            answer: "Mandi prices are fetched from government APIs and updated daily."
        },

        {
            question: "Can I upload crop images?",
            answer: "Yes, farmers can upload crop images while creating listings."
        },

        {
            question: "What should I do if login is not working?",
            answer: "Check your email/password or contact support."
        }
    ];

    // 🔍 FILTER FAQs
    const filteredFAQs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase())
    );

    // TOGGLE FAQ
    const toggleFAQ = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };

    return ( <
        div className = "help-page" >

        { /* HERO */ } <
        div className = "help-hero" >
        <
        h1 > { t.helpTitle } < /h1> <
        p > Find answers and support
        for Smart Farmer Platform < /p> < /
        div >

        { /* SEARCH */ } <
        div className = "help-search" >
        <
        input type = "text"
        placeholder = "Search help topics..."
        value = { search }
        onChange = {
            (e) => setSearch(e.target.value)
        }
        /> < /
        div >

        { /* FAQ SECTION */ } <
        div className = "faq-container" >

        <
        h2 > Frequently Asked Questions < /h2>

        {
            filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => ( <
                    div className = "faq-card"
                    key = { index } >

                    <
                    div className = "faq-question"
                    onClick = {
                        () => toggleFAQ(index)
                    } >
                    <
                    h3 > { faq.question } < /h3>

                    <
                    span > { openIndex === index ? "-" : "+" } <
                    /span> < /
                    div >

                    {
                        openIndex === index && ( <
                            p className = "faq-answer" > { faq.answer } <
                            /p>
                        )
                    }

                    <
                    /div>
                ))
            ) : ( <
                p className = "no-result" >
                No FAQs found. <
                /p>
            )
        }

        <
        /div>

        { /* SUPPORT SECTION */ } <
        div className = "support-box" >

        <
        h2 > Still Need Help ? < /h2>

        <
        p >
        Contact our AI support assistant
        for help. <
        /p>

        { /* BUTTON */ } <
        button onClick = {
            () =>
            setShowChatBot(!showChatBot)
        } > {
            showChatBot ?
            "Close Support" : "Contact Support"
        } <
        /button>

        <
        /div>

        { /* SHOW CHATBOT ONLY AFTER CLICK */ } {
            showChatBot && ( <
                div className = "chatbot-section" >
                <
                ChatBot / >
                <
                /div>
            )
        }


        <
        /div>
    );
}
// ================= CHATBOT =================

function ChatBot() {
    const [messages, setMessages] = useState([{
        sender: "bot",
        text: "👋 Hello! Welcome to Smart Farmer Support."
    }]);

    const [input, setInput] = useState("");

    const bottomRef = useRef();

    // Auto Scroll
    useEffect(() => {
        bottomRef.current.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages]);

    // AI Reply Logic
    const getBotReply = (msg) => {
        const text = msg.toLowerCase();

        if (text.includes("crop")) {
            return "🌾 Farmers can upload and sell crops from the marketplace section.";
        }

        if (text.includes("mandi")) {
            return "📊 Mandi prices are updated daily using live government APIs.";
        }

        if (text.includes("login")) {
            return "🔐 Please check your email/password or reset your account.";
        }

        if (text.includes("chat")) {
            return "💬 Farmers and buyers can communicate using real-time chat.";
        }

        if (text.includes("help")) {
            return "🆘 You can ask questions related to marketplace, crops, mandi rates, or account.";
        }

        return "🤖 Sorry, I didn't understand that. Please try another question.";
    };

    // Send Message
    const sendMessage = () => {
        if (!input.trim()) return;

        const userMsg = {
            sender: "user",
            text: input
        };

        const botMsg = {
            sender: "bot",
            text: getBotReply(input)
        };

        setMessages((prev) => [
            ...prev,
            userMsg,
            botMsg
        ]);

        setInput("");
    };

    return ( <
        div className = "chatbot-container" >

        { /* HEADER */ } <
        div className = "chatbot-header" > 🤖AI Farmer Assistant <
        /div>

        { /* CHAT BODY */ } <
        div className = "chatbot-body" >

        {
            messages.map((msg, index) => ( <
                div key = { index }
                className = {
                    msg.sender === "user" ?
                    "chat-message user" : "chat-message bot"
                } > { msg.text } <
                /div>
            ))
        }

        <
        div ref = { bottomRef } > < /div>

        <
        /div>

        { /* INPUT */ } <
        div className = "chatbot-input" >

        <
        input type = "text"
        placeholder = "Ask something..."
        value = { input }
        onChange = {
            (e) => setInput(e.target.value)
        }
        onKeyDown = {
            (e) => {
                if (e.key === "Enter") {
                    sendMessage();
                }
            }
        }
        />

        <
        button onClick = { sendMessage } >
        Send <
        /button>

        <
        /div>

        <
        /div>
    );
}
// ================= NAVBAR =================
function Navbar() {
    const { user, logout } = useAuth();
    const [search, setSearch] = useState("");
    const [isLogedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    // Change
    const {
        t,
        setLanguage,
        language
    } = useLanguage("en");

    // Example user
    // const user = JSON.parse(localStorage.getItem("user"));

    // Check login
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setMenuOpen(false);
        setIsLoggedIn(false);
        navigate("/login");
        window.location.href = "/";
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };
    const toggleLanguage = () => {
        setLanguage(
            language === "en" ?
            "hi" :
            "en"
        );
    };
    // Search
    const handleSearch = () => {
        if (!search) return;
        navigate(`/market?search=${search}`);
    };


    return ( <
        nav className = "navbar" >

        { /* Logo */ } <
        div className = "nav-left" >
        <
        Link to = "/"
        className = "logo"
        onClick = { closeMenu } > 🌾Smart Farmer <
        /Link> < /
        div >

        { /* Hamburger */ } <
        button className = "hamburger"
        onClick = {
            () => setMenuOpen(!menuOpen)
        } > ☰
        <
        /button>

        { /* Menu */ } <
        div className = { `nav-menu ${menuOpen ? "active" : ""}` } >

        <
        Link to = "/"
        onClick = { closeMenu } > { t.home } <
        /Link>

        <
        Link to = "/dashboard"
        onClick = { closeMenu } > { t.dashboard } <
        /Link>

        <
        Link to = "/market"
        onClick = { closeMenu } > { t.marketplace } <
        /Link>

        <
        Link to = "/chat"
        onClick = { closeMenu } > { t.chat } <
        /Link> <
        div className = "nav-right" >

        { /* Search */ }

        <
        div className = "search-box" >
        <
        input value = { search }
        onChange = {
            (e) => setSearch(e.target.value)
        }
        placeholder = "Search..." / >

        <
        button className = "search-btn"
        onClick = { handleSearch } > 🔍
        <
        /button> < /
        div >

        { /* Language Button */ }

        <
        button className = "language-btn"
        onClick = { toggleLanguage } > { language === "en" ? "हिंदी" : "English" } <
        /button>

        <
        /div>  

        {
            user ? ( <
                button className = "logout-btn"
                onClick = { handleLogout } > { t.logout } <
                /button>
            ) : ( <
                >
                <
                Link to = "/login"
                onClick = { closeMenu } > { t.login } <
                /Link>

                <
                Link to = "/register"
                onClick = { closeMenu } > { t.register } <
                /Link> < / >
            )
        }

        <
        /div>

        <
        /nav>
    );
}

// function Navbar() {
//     const { user, logout } = useAuth();
//     const [search, setSearch] = useState("");
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [OpenMenu, setOpenMenu] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();
//     // Change
//     const {
//         t,
//         setLanguage,
//         language
//     } = useLanguage();

//     // AUTO CLOSE ON PAGE CHANGE
//     useEffect(() => {

//         setOpenMenu(false);

//     }, [location.pathname]);

//     // Check login
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         setIsLoggedIn(!!token);
//     }, []);

//     // Logout
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         setIsLoggedIn(false);
//         navigate("/login");
//     };

//     // Search
//     const handleSearch = () => {
//         if (!search) return;
//         navigate(`/market?search=${search}`);
//     };


//     return ( <
//         div className = "navbar" >

//         { /* LEFT */ } <
//         Link to = "/"
//         className = "logo" > 🌾Smart Farmer < /Link>

//         { /* CENTER */ } <
//         div className = "nav-center" >
//         <
//         Link to = "/" > { t.home } < /Link> 

//         <
//         Link to = "/dashboard" > { t.dashboard } < /Link>

//         <
//         Link to = "/market" > { t.marketplace } < /Link>


//         <
//         Link to = "/chat" > { t.chat } < /Link> < /
//         div >

//         { /* RIGHT */ } <
//         div className = "nav-right" >

//         { /* Search */ } <
//         div className = "search-box" >
//         <
//         input value = { search }
//         onChange = {
//             (e) => setSearch(e.target.value)
//         }
//         placeholder = "Search crops..." /
//         >
//         <
//         button onClick = { handleSearch } > Search < /button> < /
//         div >

//         <
//         div className = "lang-buttons" >

//         <
//         button onClick = {
//             () =>
//             setLanguage("en")
//         } >
//         EN <
//         /button>

//         <
//         button onClick = {
//             () =>
//             setLanguage("hi")
//         } >
//         हिंदी <
//         /button>

//         <
//         /div>

//         { /* MENU */ } <
//         div className = "menu-container" >

//         <
//         button className = "menu-btn"
//         onClick = {
//             () => setOpenMenu(!OpenMenu)
//         } > ☰
//         <
//         /button>

//         {
//             OpenMenu && ( <
//                 div className = "dropdown-menu" >

//                 { /* COMMON LINKS */ } <
//                 Link to = "/about" > { t.about } < /Link> <
//                 Link to = "/contact" > { t.contact } < /Link> <
//                 Link to = "/help" > { t.help } < /Link>

//                 <
//                 hr / >

//                 {!user ? ( <
//                         >
//                         <
//                         Link to = "/login" > { t.login } < /Link> <
//                         Link to = "/register" > {
//                             t.register
//                         } < /Link> < / > ) : ( <
//                         >
//                         <
//                         p className = "menu-user" > { user.name }({ user.role }) <
//                         /p>

//                         <
//                         Link to = "/dashboard" > { t.dashboard } <
//                         /Link>

//                         <
//                         button className = "logout-btn"
//                         onClick = { logout } > { t.logout } <
//                         /button> < / >
//                     )
//                 }


//                 <
//                 /div>
//             )
//         }



//         <
//         /div>   


//         <
//         /div>


//         <
//         /div>

//     );
// }

// ================= Footer  =================
function Footer() {
    return ( <
        footer className = "footer" >
        <
        div className = "footer-container" >

        <
        div className = "footer-left" >
        <
        h3 > Smart Farmer < /h3> <
        p > Helping farmers connect, sell, and grow digitally🌾 < /p> < /
        div >

        <
        div className = "footer-links" >
        <
        Link to = "/about-portal" > About Portal < /Link> <
        Link to = "/terms-policies" > Terms & Policies < /Link> <
        Link to = "/help" > Help < /Link> <
        Link to = "/feedback" > Feedback < /Link>  <
        Link to = "/about" > About Us < /Link><
        Link to = "/contact" > Contact Us < /Link>  < /
        div >

        <
        div className = "footer-right" >
        <
        p > ©{ new Date().getFullYear() }
        Smart Farmer.All rights reserved. < /p> < /
        div >

        <
        /div> < /
        footer >
    );
}


// ================= APP =================
export default function App() {
    return ( <
            AuthProvider >
            <
            LanguageProvider >
            <
            Router >
            <
            Navbar / >
            <
            Routes >
            <
            Route path = "/login"
            element = { < Login / > }
            /> <
            Route path = "/register"
            element = { < Register / > }
            /> <
            Route exact path = "/"
            element = { < Home / > }
            /> <
            Route path = "/dashboard"
            element = { < PrivateRoute > < Dashboard / > < /PrivateRoute>} / >

                <
                Route path = "/market"
                element = { < PrivateRoute > < MarketplaceStore / > < /PrivateRoute>} / >
                    <
                    Route path = "/chat"
                    element = { < PrivateRoute > < Chat / > < /PrivateRoute>} / >
                        <
                        Route path = "/market"
                        element = { < MarketplaceStore / > }
                        /> <
                        Route path = "/product/:id"
                        element = { < ProductDetails / > }
                        /> <
                        Route path = "/add-product"
                        element = { < AddProduct / > }
                        />  <
                        Route path = "/about"
                        element = { < About / > }
                        /> <
                        Route path = "/contact"
                        element = { < Contact / > }
                        /> <
                        Route path = "/help"
                        element = { < Help / > }
                        /> <
                        Route path = "/about-portal"
                        element = { < AboutPortal / > }
                        / >


                        <
                        Route path = "/terms-policies"
                        element = { < TermsPolicies / > }
                        / > <
                        Route path = "/feedback"
                        element = { < Feedback / > }
                        / >


                        <
                        /
                        Routes >
                        <
                        Footer / >
                        <
                        /
                        Router >
                        <
                        /LanguageProvider> 

                        <
                        /
                        AuthProvider >



                    );
                }