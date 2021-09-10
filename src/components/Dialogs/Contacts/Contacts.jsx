import React from "react";
import Contact from "./Contact/Contact";
import styles from "./Contacts.module.css";
import defaultAvatar from "../../../img/default-avatar.png";

const Contacts = (props) => {
  return (
    <div className={styles.contacts}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Contact img={defaultAvatar} name="Nikita" to="/messages/1" />
        </li>
        <li className={styles.item}>
          <Contact img={defaultAvatar} name="Voloda" to="/messages/2" />
        </li>
        <li className={styles.item}>
          <Contact img={defaultAvatar} name="Pavel" to="/messages/3" />
        </li>
        <li className={styles.item}>
          <Contact img={defaultAvatar} name="Stas" to="/messages/4" />
        </li>
      </ul>
    </div>
  );
};

export default Contacts;
