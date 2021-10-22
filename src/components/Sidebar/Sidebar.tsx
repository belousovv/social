import React from "react";
import { connect } from "react-redux";
import { auth } from "../../redux/auth-selectors";
import { TRootState } from "../../redux/store";
import Friends from "../common/Friends/Friends";
import LoginOrSuccess from "../common/LoginOrSuccess/LoginOrSuccess";
import Logo from "../common/Logo/Logo";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC<TMstp> = (props) => {
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

const mapStateToProps = (state: TRootState) => ({
  isAuth: auth(state),
});

export default connect<TMstp, {}, {}, TRootState>(mapStateToProps, {})(Sidebar);

// Types

type TMstp = {
  isAuth: boolean;
}