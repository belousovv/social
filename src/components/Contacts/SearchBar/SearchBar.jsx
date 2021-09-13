import React from "react";
import styles from "./SearchBar.module.css";
import Search from "../../common/Search/Search";
import Pagination from "../../common/Pagination/Pagination";
import { connect } from "react-redux";
import { getContactsByName } from "../../../redux/contacts-reducer";

const SearchBar = (props) => {
  return (
    <div className={styles.searchbar}>
      <Pagination />
      <Search handleSubmit={props.getContactsByName} />
    </div>
  );
};

export default connect(null, { getContactsByName })(SearchBar);
