import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { auth } from "../../redux/auth-selectors";
import styles from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  const isAuth = useSelector(auth);

  return isAuth ? (
    <Redirect to="/profile" />
  ) : (
    <div className={styles.loginPage}></div>
  );
};

export default LoginPage;
