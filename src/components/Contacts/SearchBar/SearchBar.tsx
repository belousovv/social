import React from "react";
import styles from "./SearchBar.module.css";
import Search from "../../common/Search/Search";
import Pagination from "../../common/Pagination/Pagination";
import { connect } from "react-redux";
import { getContactsByName } from "../../../redux/contacts-reducer";
import { TRootState } from "../../../redux/store";

const SearchBar: React.FC<TMdtp> = (props) => {
  return (
    <div className={styles.searchbar}>
      <Pagination />
      <Search handleSubmit={props.getContactsByName} />
    </div>
  );
};

export default connect<{}, TMdtp, {}, TRootState>(null, { getContactsByName })(
  SearchBar
);

// Types

type TMdtp = {
  getContactsByName: (name: string) => void;
};
