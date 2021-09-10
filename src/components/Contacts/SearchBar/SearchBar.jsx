import React from 'react'
import styles from "./SearchBar.module.css";
import Search from "../../common/Search/Search";

const SearchBar = () => {
    return (
        <div className={styles.searchbar}>
            <div>Pagination</div>
            <Search />
        </div>
    )
}

export default SearchBar
