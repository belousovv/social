import React from "react";
import styles from "./Dropdown.module.css";

const Dropdown = (props) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.btn}>
          <svg className={styles.svg}>
              <polygon fill="grey" points="0 0, 20 0, 10 10"></polygon>
          </svg>
      </div>
      <ul className={styles.content}>
        {props.items.map(el => <li key={el.id} onClick={el.onClickHandler}>{el.item}</li>)}
      </ul>
    </div>
  );
};

export default Dropdown;
