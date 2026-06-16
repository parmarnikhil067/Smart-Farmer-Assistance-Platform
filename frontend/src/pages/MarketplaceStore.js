import {
    useState
} from "react";

import MarketplaceHero
from "../components/marketplace/MarketplaceHero";

import FilterSidebar
from "../components/marketplace/FilterSidebar";

import SearchBar
from "../components/marketplace/SearchBar";

import ProductCard
from "../components/marketplace/ProductCard";

import "./Marketplace.css";

function MarketplaceStore() {

    const products = [

        {

            id: 1,

            name: "Organic Wheat",

            price: 2400,

            location: "Indore",

            farmer: "Ramesh Patel",

            rating: 4.5,

            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b"

        },

        {

            id: 2,

            name: "Fresh Rice",

            price: 3200,

            location: "Bhopal",

            farmer: "Suresh Verma",

            rating: 4.8,

            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c"

        },

        {

            id: 3,

            name: "Soybean",

            price: 5100,

            location: "Dewas",

            farmer: "Amit Singh",

            rating: 4.3,

            image: "https://images.pexels.com/photos/5503257/pexels-photo-5503257.jpeg"

        }

    ];

    const [search, setSearch] =
    useState("");

    // FILTER PRODUCTS
    const filteredProducts =
        products.filter((item) =>

            item.name
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )

        );

    return (

        <
        div className = "marketplace-page" >

        { /* HERO */ } <
        MarketplaceHero / >

        { /* SEARCH */ } <
        SearchBar search = { search }
        setSearch = { setSearch }
        />

        <
        div className = "market-layout" >

        { /* SIDEBAR */ } <
        FilterSidebar / >

        { /* PRODUCTS */ } <
        div className = "products-section" >

        <
        div className = "products-header" >

        <
        h2 > 🌾Available Crops <
        /h2>

        <
        p > {
            filteredProducts.length
        } { " " }
        products found <
        /p>

        <
        /div>

        <
        div className = "products-grid" >

        {
            filteredProducts.map(
                (item) => (

                    <
                    ProductCard key = { item.id }
                    item = { item }
                    />

                ))
        }

        <
        /div>

        <
        /div>

        <
        /div>

        <
        /div>
    );
}

export default MarketplaceStore;