import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Page404.module.css";

const Page404: React.FC = () => {
  return (
    <div className={styles.page404}>
      <h1 className={styles.title}>404</h1>
      <h4 className={styles.subtitle}>page not found</h4>
      <p className={styles.text}>
        sorry, the page you are trying to access does not exist, try <NavLink to="/">home page</NavLink>
      </p>
    </div>
  );
};

export default Page404;
