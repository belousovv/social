import React from "react";
import Messanger from "./Messanger/Messanger";
import styles from "./Messangers.module.css";
import defaultAvatar from "../../../img/default-avatar.png";

const Messangers: React.FC = () => {
  return (
    <div className={styles.messangers}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Messanger img={defaultAvatar} name="Nikita" to="/messages/1" />
        </li>
        <li className={styles.item}>
          <Messanger img={defaultAvatar} name="Voloda" to="/messages/2" />
        </li>
        <li className={styles.item}>
          <Messanger img={defaultAvatar} name="Pavel" to="/messages/3" />
        </li>
        <li className={styles.item}>
          <Messanger img={defaultAvatar} name="Stas" to="/messages/4" />
        </li>
      </ul>
    </div>
  );
};

export default Messangers;