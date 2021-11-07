import React from "react";
import styles from "./SearchBar.module.css";
import Search from "../../common/Search/Search";
import Pagination from "../../common/Pagination/Pagination";

const SearchBar: React.FC = () => {
  return (
    <div className={styles.searchbar}>
      <Pagination />
      <Search />
    </div>
  );
};

export default  SearchBar;