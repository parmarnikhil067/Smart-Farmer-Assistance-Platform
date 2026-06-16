function SearchBar({

    search,
    setSearch

}) {

    return (

        <
        div className = "market-search" >

        <
        input type = "text"

        placeholder =
        "Search crops..."

        value = { search }

        onChange = {
            (e) =>
            setSearch(
                e.target.value
            )
        }
        />

        <
        /div>
    );
}

export default SearchBar;