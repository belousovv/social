import React from "react";
import { connect } from "react-redux";
import { auth } from "../../redux/auth-selectors";
import Friends from "../common/Friends/Friends";
import LoginOrSuccess from "../common/LoginOrSuccess/LoginOrSuccess";
import Logo from "../common/Logo/Logo";
import styles from "./Sidebar.module.css";

const Sidebar = (props) => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Logo />
        </li>
        <li className={styles.item}>
          <LoginOrSuccess />
        </li>
        {props.isAuth && (
          <li className={styles.item}>
            <Friends />
          </li>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: auth(state),
});

export default connect(mapStateToProps, null)(Sidebar);
