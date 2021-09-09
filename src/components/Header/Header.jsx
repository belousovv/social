import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              className={styles.link}
              activeClassName={styles.active}
              to="/profile"
            >
              Profile
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              className={styles.link}
              activeClassName={styles.active}
              to="/messages"
            >
              Messages
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
