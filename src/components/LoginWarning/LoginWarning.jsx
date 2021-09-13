import React from "react";
import styles from "./LoginWarning.module.css";

const LoginWarning = () => {
  return (
    <div className={styles.loginWarning}>
      <h6 className={styles.warning}>
        To see this page, you must be logged in.
      </h6>
    </div>
  );
};

export default LoginWarning;
