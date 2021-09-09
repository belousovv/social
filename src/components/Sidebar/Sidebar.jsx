import React from "react";
import Friends from "../common/Friends/Friends";
import LoginOrSuccess from "../common/LoginOrSuccess/LoginOrSuccess";
import Search from "../common/Search/Search";
import styles from "./Sidebar.module.css";

const Sidebar = (props) => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Search />
        </li>
        <li className={styles.item}>
          <LoginOrSuccess />
        </li>
        <li className={styles.item}>
          <Friends />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
