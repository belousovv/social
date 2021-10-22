import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { auth } from "../../redux/auth-selectors";
import styles from "./LoginWarning.module.css";

const LoginWarning: React.FC = () => {

  const isAuth = useSelector(auth);

  if (isAuth) {
    return <Redirect to="/profile" />
  }

  return (
    <div className={styles.loginWarning}>
      <h6 className={styles.warning}>
        To see this page, you must be logged in.
      </h6>
    </div>
  );
};

export default LoginWarning;