function FilterSidebar() {

    return (

        <
        div className = "filter-sidebar" >

        <
        h3 >
        Filters <
        /h3>

        <
        label >

        <
        input type = "checkbox" / >

        Wheat

        <
        /label>

        <
        label >

        <
        input type = "checkbox" / >

        Rice

        <
        /label>

        <
        label >

        <
        input type = "checkbox" / >

        Soybean

        <
        /label>

        <
        label >

        <
        input type = "checkbox" / >

        Organic

        <
        /label>

        <
        /div>
    );
}

export default FilterSidebar;