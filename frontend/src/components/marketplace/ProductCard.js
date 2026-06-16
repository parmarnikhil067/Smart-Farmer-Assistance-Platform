function ProductCard({ item }) {

    return (

        <
        div className = "product-card" >

        { /* DISCOUNT */ } <
        div className = "discount-badge" >

        10 % OFF

        <
        /div>

        { /* IMAGE */ } <
        img src = { item.image }
        alt = { item.name }
        />

        <
        div className = "product-info" >

        { /* TOP */ } <
        div className = "product-top" >

        <
        h3 > { item.name } <
        /h3>

        <
        button className = "wishlist-btn" >
        ❤️
        <
        /button>

        <
        /div>

        { /* CATEGORY */ } <
        div className = "category-tag" >

        Organic

        <
        /div>

        { /* FARMER */ } <
        p > 👨‍🌾{ " " } { item.farmer } <
        /p>

        <
        p className = "verified" >

        ✔Verified Farmer

        <
        /p>

        { /* LOCATION */ } <
        p > 📍{ " " } { item.location } <
        /p>

        { /* RATING */ } <
        div className = "rating" >

        ⭐⭐⭐⭐⭐

        <
        span > { " " }
        ({ item.rating }) <
        /span>

        <
        /div>

        { /* STOCK */ } <
        p className = "stock in-stock" >

        In Stock

        <
        /p>

        { /* PRICE */ } <
        h2 >

        ₹{ item.price }

        <
        /h2>

        { /* BUTTONS */ } <
        div className = "product-buttons" >

        <
        button className = "cart-btn" >

        🛒Add to Cart

        <
        /button>

        <
        button className = "view-btn" >

        👀Quick View

        <
        /button>

        <
        /div>

        <
        /div>

        <
        /div>
    );
}

export default ProductCard;